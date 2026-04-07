const { askQuestion } = require("../services/askService");

// Handles user question request and returns AI-generated answer
const handleAskQuestion = async (req, res) => {
    try {
        const { question } = req.body;

        // Validate input
        if (!question) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        // Call service layer to process question using RAG pipeline
        const response = await askQuestion(question);

        return res.status(200).json(response);

    } catch (error) {
        console.error("Ask API Error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = { handleAskQuestion };