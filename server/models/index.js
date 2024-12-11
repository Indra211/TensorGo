const user = require("./users");
const request = require("./requests");

module.exports = {
  userScheama: user.User,
  requestSchema: request.requestSchema,
};
