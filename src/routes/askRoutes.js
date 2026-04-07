const express = require("express");
const askRouter = express.Router();

const { ask } = require("../controllers/askController");

askRouter.post("/", ask);

module.exports = askRouter;