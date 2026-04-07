const { logError } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logError(err);

  res.status(err.status || 500).json({
    message: "Something went wrong"
  });
};

module.exports = errorHandler;