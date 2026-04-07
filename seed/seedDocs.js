require("dotenv").config();
const mongoose = require("mongoose");
const Document = require("../src/models/Document");

const seedData = [
  {
    title: "Refund Policy",
    content: "Refunds are processed within 5-7 business days after approval.",
    tags: ["refund", "payment"]
  },
  {
    title: "Shipping Policy",
    content: "Orders are shipped within 2-3 business days.",
    tags: ["shipping", "delivery"]
  },
  {
    title: "Cancellation Policy",
    content: "Orders can be cancelled within 24 hours of purchase.",
    tags: ["cancel", "order"]
  },
  {
    title: "Return Policy",
    content: "Products can be returned within 10 days if unused.",
    tags: ["return", "product"]
  },
  {
    title: "Support Contact",
    content: "You can contact support at support@example.com.",
    tags: ["support", "help"]
  }
];

const seedDocs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected for seeding...");

    await Document.deleteMany(); // clean old data

    await Document.insertMany(seedData);

    console.log("✅ Seed data inserted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDocs();