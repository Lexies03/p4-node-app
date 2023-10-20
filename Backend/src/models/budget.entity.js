const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  total: Number,
  complete: {
    type: Boolean,
    default: false,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const BudegtModel = mongoose.model("budget", BudgetSchema);

module.exports = BudegtModel;
