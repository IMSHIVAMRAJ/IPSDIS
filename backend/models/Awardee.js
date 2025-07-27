const mongoose = require("mongoose");

const awardeeSchema = new mongoose.Schema({
  awardName: { type: String, required: true },
  sno: { type: Number, required: true },
  year: { type: Number, required: true },
  awardeeName: { type: String, required: true },
  lectureTopic: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Awardee", awardeeSchema);
