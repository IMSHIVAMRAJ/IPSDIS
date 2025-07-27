const Award = require("../models/Award");

exports.createAward = async (req, res) => {
  try {
    const { sno, name, year, value, periodicity, eligibility, administration, procedure, presentation } = req.body;

    const award = new Award({ sno, name, year, value, periodicity, eligibility, administration, procedure, presentation });

    await award.save();
    res.status(201).json(award);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAwards = async (req, res) => {
  const awards = await Award.find().sort({ createdAt: -1 });
  res.status(200).json(awards);
};

exports.getAwardById = async (req, res) => {
  const award = await Award.findById(req.params.id);
  if (!award) return res.status(404).json({ error: "Award not found" });
  res.status(200).json(award);
};

exports.updateAward = async (req, res) => {
  const { sno, name, year, value, periodicity, eligibility, administration, procedure, presentation } = req.body;

  const updated = { sno, name, year, value, periodicity, eligibility, administration, procedure, presentation };

  const award = await Award.findByIdAndUpdate(req.params.id, updated, { new: true });
  res.status(200).json(award);
};

exports.deleteAward = async (req, res) => {
  await Award.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Award deleted" });
};
