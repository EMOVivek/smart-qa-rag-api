const History = require("../models/History");
const { logError } = require("../utils/logger");


const fetchHistory = async (req, res) => {
    try {
        const data = await History.find()
            .sort({ createdAt: -1 })
            .limit(10);

        return res.status(200).json(data);
    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}
module.exports = { fetchHistory }