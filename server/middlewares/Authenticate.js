const { userScheama } = require("../models");
const { verifyGoogleToken } = require("../utils/helpers");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized");
    const payload = await verifyGoogleToken(token);
    const getUser = await userScheama.findOne({ googleId: payload.sub });
    if (getUser) {
      req.user = getUser;
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { authenticate };
