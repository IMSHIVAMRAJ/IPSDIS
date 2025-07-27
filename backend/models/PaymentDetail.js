const mongoose = require("mongoose");

const paymentDetailSchema = new mongoose.Schema(
  {
    accountHolderName: { type: String, required: true },
    bankAndBranch: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    micrCode: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentDetail", paymentDetailSchema);
