const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  type: { type: String, default: "user" },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
