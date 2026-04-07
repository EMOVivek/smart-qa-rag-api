const express = require("express");
const askRouter = express.Router();

const { handleAskQuestion } = require("../controllers/askController");
const authenticate = require("../middlewares/authMiddleware");
const askLimiter = require("../middlewares/rateLimiter");


askRouter.post("/", authenticate, askLimiter, handleAskQuestion);

module.exports = askRouter;