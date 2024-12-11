const mongoose = require("mongoose");
const RequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String,
  comment: String,
  body: String,
  type: String,
  id: String,
  created_at: Number,
  message_type: String,
  conversation_id: String,
});

const requestSchema = mongoose.model("Request", RequestSchema);

module.exports = {
  requestSchema,
};
