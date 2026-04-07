const { askQuestion } = require("../services/askService");
const { logInfo, logError } = require("../utils/logger");

// Handles user question request and returns AI-generated answer
const handleAskQuestion = async (req, res) => {
    const start = Date.now();
    try {
        const { question } = req.body;

        // Validate input
        if (!question) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        const latency = Date.now() - start;
        const userId = req.user?.userId;

        // Call service layer to process question using RAG pipeline
        const response = await askQuestion(question, userId);
        // Structured logging
        logInfo({
            route: "/api/ask",
            userId: userId,
            question: question.slice(0, 50),
            latencyMs: latency,
            confidence: response.confidence
        });
        return res.status(200).json(response);

    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = { handleAskQuestion };