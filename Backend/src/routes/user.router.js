const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.entity");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Get Users Error", error);
  }
});

router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: hash,
    });

    user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log("Error", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userDelete = await User.findByIdAndDelete(id);
    res.status(200).json(userDelete);
  } catch (error) {
    console.log("Delete User Error", error);
  }
});

module.exports = router;
