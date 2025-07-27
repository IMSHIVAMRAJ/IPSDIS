const Awardee = require("../models/Awardee");

exports.createAwardee = async (req, res) => {
  try {
    const { awardName, sno, year, awardeeName, lectureTopic } = req.body;

    const awardee = new Awardee({ awardName, sno, year, awardeeName, lectureTopic });
    await awardee.save();

    res.status(201).json(awardee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAwardees = async (req, res) => {
  const awardees = await Awardee.find().sort({ createdAt: -1 });
  res.status(200).json(awardees);
};

exports.getAwardeeById = async (req, res) => {
  const awardee = await Awardee.findById(req.params.id);
  if (!awardee) return res.status(404).json({ error: "Awardee not found" });
  res.status(200).json(awardee);
};

exports.updateAwardee = async (req, res) => {
  const { awardName, sno, year, awardeeName, lectureTopic } = req.body;

  const updated = { awardName, sno, year, awardeeName, lectureTopic };
  const awardee = await Awardee.findByIdAndUpdate(req.params.id, updated, { new: true });

  res.status(200).json(awardee);
};

exports.deleteAwardee = async (req, res) => {
  await Awardee.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Awardee deleted" });
};
