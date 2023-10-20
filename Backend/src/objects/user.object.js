const UserModel = require("../models/user.entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class User {
  constructor() {}

  async login(username, password) {
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      throw new Error("User not Found");
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const parsedUser = JSON.parse(JSON.stringify(user));
      delete parsedUser.password;
      return jwt.sign(parsedUser, process.env.SECRET, {
        expiresIn: "1d",
      });
    } else {
      return "";
    }
  }
}

module.exports = User;
