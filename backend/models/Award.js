const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema(
  {
    sno: Number,
    name: { type: String, required: true },
    year: Number,
    value: String,
    periodicity: String,
    eligibility: String,
    administration: String,
    procedure: String,
    presentation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Award", awardSchema);
