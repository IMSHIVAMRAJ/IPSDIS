const AwardNomination = require("../models/AwardNomination");

exports.createNomination = async (req, res) => {
  try {
    const { mainContent, instructions, links } = req.body;

    const nomination = new AwardNomination({
      mainContent,
      instructions: JSON.parse(instructions),
      links: JSON.parse(links),
    });

    await nomination.save();
    res.status(201).json(nomination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNominations = async (req, res) => {
  const nominations = await AwardNomination.find().sort({ createdAt: -1 });
  res.status(200).json(nominations);
};

exports.getNominationById = async (req, res) => {
  const nomination = await AwardNomination.findById(req.params.id);
  if (!nomination) return res.status(404).json({ error: "Nomination not found" });
  res.status(200).json(nomination);
};

exports.updateNomination = async (req, res) => {
  const { mainContent, instructions, links } = req.body;

  const updated = {
    mainContent,
    instructions: JSON.parse(instructions),
    links: JSON.parse(links),
  };

  const nomination = await AwardNomination.findByIdAndUpdate(req.params.id, updated, { new: true });
  res.status(200).json(nomination);
};

exports.deleteNomination = async (req, res) => {
  await AwardNomination.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Nomination deleted" });
};
