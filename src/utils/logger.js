const logInfo = (data) => {
  console.log(JSON.stringify({
    level: "info",
    timestamp: new Date().toISOString(),
    ...data
  }));
};

const logError = (error) => {
  console.error(JSON.stringify({
    level: "error",
    timestamp: new Date().toISOString(),
    message: error.message
  }));
};

module.exports = { logInfo, logError };