const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  interComId: String,
  picture: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
