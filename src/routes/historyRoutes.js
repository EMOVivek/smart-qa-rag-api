const express = require("express");
const historyRouter = express.Router();
const History = require("../models/History");

historyRouter.get("/", async (req, res) => {
    const data = await History.find()
        .sort({ createdAt: -1 })
        .limit(10);

    res.json(data);
});

module.exports = historyRouter;