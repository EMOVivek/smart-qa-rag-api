const OpenAI = require("openai");
const { z } = require("zod");
const Document = require("../models/Document");
const cosineSimilarity = require("../utils/cosineSimilarity");
const getEmbedding = require("./embeddingService");
const History = require("../models/History");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ZOD schema
const responseSchema = z.object({
    answer: z.string(),
    sources: z.array(z.string()),
    confidence: z.enum(["high", "medium", "low"])
});


// Semantic search
const findRelevantDocs = async (question) => {
    const queryEmbedding = await getEmbedding(question);

    const docs = await Document.find();

    const scored = docs.map(doc => ({
        doc,
        score: cosineSimilarity(queryEmbedding, doc.embedding)
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 3).map(s => s.doc);
};

// Prompt for AI.
const buildPrompt = (question, docs) => {
    const context = docs.map(d => d.content).join("\n");

    return `
You are a strict AI assistant.

Rules:
- ONLY answer using the provided context
- If answer is not explicitly present, respond:
  "Not available in provided documents"
- DO NOT guess or add external knowledge

Context:
${context}

Question:
${question}

Return STRICT JSON ONLY:
{
  "answer": "",
  "sources": [],
  "confidence": "high | medium | low"
}
`;
};

// 🤖 LLM call
const askLLM = async (prompt) => {
    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
    });

    return res.choices[0].message.content;
};

// Confidence
const getConfidence = (docs) => {
    if (docs.length >= 2) return "high";
    if (docs.length === 1) return "medium";
    return "low";
};

// function to
const askQuestion = async (question, userId) => {

    const docs = await findRelevantDocs(question);
    const prompt = buildPrompt(question, docs);
    const raw = await askLLM(prompt);
    let parsed;
    try {
        parsed = JSON.parse(raw);
        responseSchema.parse(parsed);
    } catch {
        parsed = {
            answer: "Error parsing response",
            sources: [],
            confidence: "low"
        };
    }
    await History.create({
        userId: userId,
        question,
        answer: parsed.answer
    });

    return {
        ...parsed,
        sources: docs.map(d => d._id.toString()),
        confidence: getConfidence(docs)
    };
};

module.exports = { askQuestion };