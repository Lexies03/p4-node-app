const express = require("express");
const router = express.Router();
const Grocery = require("../models/grocery.entity");

router.get("/", async (req, res) => {
  const groceries = await Grocery.find();
  res.status(200).json(groceries);
});

router.post("/", async (req, res) => {
  const grocery = new Grocery({ ...req.body });
  grocery.save();
  res.status(201).json(grocery);
});

router.get("/toggle/complete/:id", async (req, res) => {
  const id = req.params.id;
  const grocery = await Grocery.findById(id);
  grocery.complete = !grocery.complete;

  grocery.save();
  res.status(200).json(grocery);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Grocery.findByIdAndDelete(id);
  res.status(200).json(result);
});

router.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Grocery.findById({ _id: id });
  res.status(200).json(result);
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Grocery.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, quantity: req.body.quantity }
  );
  res.status(200).json(result);
});

module.exports = router;
