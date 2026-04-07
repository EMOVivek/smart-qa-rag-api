const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({

    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [
        {
            type: String
        }
    ],
    embedding: { type: [Number] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", documentSchema);