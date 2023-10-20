const express = require("express");
const router = express.Router();
const Budget = require("../models/budget.entity");

router.get("/", async (req, res) => {
  const budgetGroceries = await Budget.find();
  res.status(200).json(budgetGroceries);
});

router.post("/", async (req, res) => {
  const budgetGroceries = new Budget({ ...req.body });
  budgetGroceries.save();
  res.status(201).json(budgetGroceries);
});

router.get("/toggle/complete/:id", async (req, res) => {
  const id = req.params.id;
  const budgetGroceries = await Budget.findById(id);
  budgetGroceries.complete = !budgetGroceries.complete;

  budgetGroceries.save();
  res.status(200).json(budgetGroceries);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Budget.findByIdAndDelete(id);
  res.status(200).json(result);
});

router.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Budget.findById({ _id: id });
  res.status(200).json(result);
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Budget.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      total: req.body.total,
    }
  );
  res.status(200).json(result);
});

module.exports = router;
