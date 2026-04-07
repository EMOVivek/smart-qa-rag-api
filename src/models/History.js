const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  question: String,
  answer: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("History", historySchema);