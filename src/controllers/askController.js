const { askQuestion } = require("../services/askService");

const ask = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const result = await askQuestion(question);

       return res.status(200).json(result);
    } catch (error) {
       return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { ask };