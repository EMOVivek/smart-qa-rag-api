const express = require("express");
const { fetchHistory } = require("../controllers/historyController");
const historyRouter = express.Router();

historyRouter.get("/", fetchHistory);

module.exports = historyRouter;