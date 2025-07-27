const mongoose = require("mongoose");

const executiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: String,
  image: String,
  postalAddress: String,
  email: String,
  mobile: String,
  biodata: String,
}, { timestamps: true });

module.exports = mongoose.model("Executive", executiveSchema);
