require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const askRouter = require("./src/routes/askRoutes");
const docsRouter = require("./src/routes/docRoutes");
const authRouter = require("./src/routes/authRoutes");
const historyRouter = require("./src/routes/historyRoutes");

const app = express();



// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/docs", docsRouter);
app.use("/api/ask", askRouter);
app.use("/api/auth", authRouter);
app.use("/api/ask/history", historyRouter);

// Health check route .
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 4000;

//  Start Server
app.listen(PORT, (error) => {
    if (!error) {
        connectDB();        // Connect Database
        console.log(`Server running on port ${PORT}`);
    } else {
        console.error(error);
    }

});