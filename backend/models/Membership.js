const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    membershipInfo: { type: String, required: true },
    nationality: { type: String, required: true },
    membershipType: { type: String, required: true },
    membershipFee: { type: Number, required: true },
    gst: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);
