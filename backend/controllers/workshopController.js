const Workshop = require("../models/Workshop");

exports.createWorkshop = async (req, res) => {
  try {
    const { serialNumber, year, topic, venue, date } = req.body;

    const workshop = new Workshop({
      serialNumber,
      year,
      topic,
      venue,
      date,
    });

    await workshop.save();
    res.status(201).json(workshop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllWorkshops = async (req, res) => {
  const workshops = await Workshop.find().sort({ createdAt: -1 });
  res.status(200).json(workshops);
};

exports.getWorkshopById = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) return res.status(404).json({ error: "Workshop not found" });
  res.status(200).json(workshop);
};

exports.updateWorkshop = async (req, res) => {
  const { serialNumber, year, topic, venue, date } = req.body;

  const updated = {
    serialNumber,
    year,
    topic,
    venue,
    date,
  };

  const workshop = await Workshop.findByIdAndUpdate(req.params.id, updated, { new: true });
  res.status(200).json(workshop);
};

exports.deleteWorkshop = async (req, res) => {
  await Workshop.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Workshop deleted" });
};
