const mongoose = require("mongoose");

const GrocerySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  complete: {
    type: Boolean,
    default: false,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const GroceryModel = mongoose.model("groceries", GrocerySchema);

module.exports = GroceryModel;
