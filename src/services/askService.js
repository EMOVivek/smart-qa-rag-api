const Document = require("../models/Document");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Step 1: Find relevant docs
const findRelevantDocs = async (question) => {
    const keyword = question.toLowerCase();

    const docs = await Document.find({
        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { content: { $regex: keyword, $options: "i" } },
            { tags: { $in: [keyword] } }
        ]
    }).limit(3);

    return docs;
};

// 🧠 Step 2: Build prompt
const buildPrompt = (question, docs) => {
    const context = docs.map(d => d.content).join("\n");

    return `
You are a helpful assistant.

Answer ONLY from the given context.
If answer is not in context, say "Not available in provided documents".

Context:
${context}

Question:
${question}

Return JSON:
{
  "answer": "",
  "sources": [],
  "confidence": ""
}
`;
};

// 🤖 Step 3: Call LLM
const askLLM = async (prompt) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: prompt }
            ]
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 🎯 Step 4: Confidence logic
const getConfidence = (docs) => {
    if (docs.length >= 2) return "high";
    if (docs.length === 1) return "medium";
    return "low";
};

// 🚀 MAIN FUNCTION
const askQuestion = async (question) => {
    const docs = await findRelevantDocs(question);

    const prompt = buildPrompt(question, docs);

    const rawResponse = await askLLM(prompt);

    let parsed;

    try {
        parsed = JSON.parse(rawResponse);
    } catch {
        parsed = {
            answer: rawResponse,
            sources: [],
            confidence: "low"
        };
    }

    return {
        ...parsed,
        sources: docs.map(d => d._id),
        confidence: getConfidence(docs)
    };
};

module.exports = { askQuestion };