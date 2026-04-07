const express = require("express");
const { handleAskQuestion } = require("../controllers/askController");
const askRouter = express.Router();


askRouter.post("/", handleAskQuestion);

module.exports = askRouter;