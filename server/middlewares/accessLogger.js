const fs = require("fs");

const AccessLogger = (req, res, next) => {
  res.on("finish", () => {
    fs.appendFile(
      "access.log",
      `${req.method} ${req.url} ${res.statusCode} ${res.statusMessage}\n`,
      (err) => {
        if (err) {
          console.error("Error writing to log file:", err);
        }
      }
    );
    console.log(
      `${req.method} ${req.url} ${res.statusCode} ${res.statusMessage}`
    );
  });
  next();
};

module.exports = { AccessLogger };
