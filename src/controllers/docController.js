const Document = require("../models/Document");


// Fetch all docs record.
const getAllDocs = async (req, res) => {
    try {
        const docs = await Document.find().sort({ createdAt: -1 });

        return res.status(200).json(docs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getAllDocs };