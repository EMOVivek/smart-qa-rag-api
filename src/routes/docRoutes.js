const express = require("express");
const { getAllDocs } = require("../controllers/docController");
const docsRouter = express.Router();


docsRouter.get("/", getAllDocs);

module.exports = docsRouter;