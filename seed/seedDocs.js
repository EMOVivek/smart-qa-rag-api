require("dotenv").config();
const mongoose = require("mongoose");
const Document = require("../src/models/Document");
const getEmbedding = require("../src/services/embeddingService");


// Dummy data for initial dataset
const seedData = [
    {
        title: "Refund Policy",
        content: "Refunds are processed within 5-7 business days after approval.",
        tags: ["refund", "payment"]
    },
    {
        title: "Shipping Policy",
        content: "Orders are shipped within 2-3 business days.",
        tags: ["shipping"]
    },
    {
        title: "Cancellation Policy",
        content: "Orders can be cancelled within 24 hours of purchase.",
        tags: ["cancel"]
    },
    {
        title: "Return Policy",
        content: "Products can be returned within 10 days if unused.",
        tags: ["return"]
    },
    {
        title: "Support Contact",
        content: "Contact support at support@example.com.",
        tags: ["support"]
    }
];


// This function is for save seedData in mongo db.
const seedDocs = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const docs = [];
    for (let doc of seedData) {
        const embedding = await getEmbedding(doc.content); // calling getEmbedding function
        docs.push({ ...doc, embedding });
    }

    await Document.insertMany(docs);

    console.log("✅ Seeded with embeddings");
    process.exit();
};

seedDocs();