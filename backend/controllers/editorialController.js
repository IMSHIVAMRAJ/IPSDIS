const EditorialBoard = require("../models/EditorialBoard");

exports.createEditorial = async (req, res) => {
  try {
    const { category, content, areasOfSpecialization } = req.body;

    const editorial = new EditorialBoard({
      category,
      content,
      areasOfSpecialization: JSON.parse(areasOfSpecialization),
    });

    await editorial.save();
    res.status(201).json(editorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEditorials = async (req, res) => {
  const data = await EditorialBoard.find().sort({ createdAt: -1 });
  res.status(200).json(data);
};

exports.getEditorialById = async (req, res) => {
  const data = await EditorialBoard.findById(req.params.id);
  if (!data) return res.status(404).json({ error: "Not found" });
  res.status(200).json(data);
};

exports.updateEditorial = async (req, res) => {
  const { category, content, areasOfSpecialization } = req.body;

  const updated = await EditorialBoard.findByIdAndUpdate(
    req.params.id,
    {
      category,
      content,
      areasOfSpecialization: JSON.parse(areasOfSpecialization),
    },
    { new: true }
  );

  res.status(200).json(updated);
};

exports.deleteEditorial = async (req, res) => {
  await EditorialBoard.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Deleted" });
};
