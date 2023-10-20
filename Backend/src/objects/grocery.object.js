const GroceryModel = require("../models/grocery.entity");

class Grocery {
  constructor() {}

  async createGrocery(grocery) {
    const newGrocery = new GroceryModel({
      ...grocery,
    });
    const savedGrocery = await newGrocery.save();
    return savedGrocery;
  }

  findGrocery() {
    return GroceryModel.find();
  }

  findGroceryById(id) {
    return GroceryModel.find({ _id: id });
  }

  findIdAndDelete(id) {
    return GroceryModel.findById({ _id: id });
  }

  findIdAndUpdate(id, updatedData) {
    return GroceryModel.findById({ _id: id }, updatedData, {
      new: true,
    });
  }

  findIdAndUpdateGet(id) {
    return GroceryModel.findById({ _id: id });
  }
}

module.exports = Grocery;
