const PaymentDetail = require("../models/PaymentDetail");

exports.createPaymentDetail = async (req, res) => {
  try {
    const { accountHolderName, bankAndBranch, accountNumber, ifscCode, micrCode } = req.body;

    const newDetail = new PaymentDetail({
      accountHolderName,
      bankAndBranch,
      accountNumber,
      ifscCode,
      micrCode,
    });

    await newDetail.save();
    res.status(201).json(newDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPaymentDetails = async (req, res) => {
  const details = await PaymentDetail.find().sort({ createdAt: -1 });
  res.status(200).json(details);
};

exports.getPaymentDetailById = async (req, res) => {
  const detail = await PaymentDetail.findById(req.params.id);
  if (!detail) return res.status(404).json({ error: "Payment detail not found" });
  res.status(200).json(detail);
};

exports.updatePaymentDetail = async (req, res) => {
  const { accountHolderName, bankAndBranch, accountNumber, ifscCode, micrCode } = req.body;

  const updated = await PaymentDetail.findByIdAndUpdate(
    req.params.id,
    {
      accountHolderName,
      bankAndBranch,
      accountNumber,
      ifscCode,
      micrCode,
    },
    { new: true }
  );

  res.status(200).json(updated);
};

exports.deletePaymentDetail = async (req, res) => {
  await PaymentDetail.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Payment detail deleted" });
};
