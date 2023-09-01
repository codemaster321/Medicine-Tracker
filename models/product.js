const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  medicine: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", medicineSchema);
