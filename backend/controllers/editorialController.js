const EditorialBoard = require("../models/EditorialBoard");

exports.createEditorial = async (req, res) => {
  try {
    const { category, content, areasOfSpecialization } = req.body;

    const editorial = new EditorialBoard({
      category,
      content,
      // ✅ FIX: Removed JSON.parse(). The data is already an array.
      areasOfSpecialization,
    });

    await editorial.save();
    res.status(201).json(editorial);
  } catch (err) {
    console.error("🔥 Create Editorial Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEditorials = async (req, res) => {
  try {
    const data = await EditorialBoard.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEditorialById = async (req, res) => {
  try {
    const data = await EditorialBoard.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEditorial = async (req, res) => {
  try {
    const { category, content, areasOfSpecialization } = req.body;

    const updated = await EditorialBoard.findByIdAndUpdate(
      req.params.id,
      {
        category,
        content,
        // ✅ FIX: Removed JSON.parse(). The data is already an array.
        areasOfSpecialization,
      },
      { new: true } // This returns the updated document
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("🔥 Update Editorial Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEditorial = async (req, res) => {
  try {
    const deleted = await EditorialBoard.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};