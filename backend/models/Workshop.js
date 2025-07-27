const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    serialNumber: { type: Number, required: true },
    year: { type: Number, required: true },
    topic: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workshop", workshopSchema);
