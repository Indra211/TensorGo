const fs = require("fs");

const errorLogger = (err, req, res, next) => {
  fs.appendFile(
    "error.log",
    `${new Date().toISOString()} - ${req.method} ${req.url} - ${err.message}\n`,
    (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    }
  );
  console.error(err.stack);
  res.status(500).send("Server error");
};

module.exports = { errorLogger };
