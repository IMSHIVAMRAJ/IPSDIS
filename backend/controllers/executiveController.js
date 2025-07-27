const Executive = require("../models/Executive");

exports.createExecutive = async (req, res) => {
  try {
    const { name, designation, postalAddress, email, mobile, biodata } = req.body;
    const image = req.file?.path;

    const exec = new Executive({
      name,
      designation,
      postalAddress,
      email,
      mobile,
      biodata,
      image,
    });

    await exec.save();
    res.status(201).json(exec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExecutives = async (req, res) => {
  const all = await Executive.find().sort({ createdAt: -1 });
  res.status(200).json(all);
};

exports.getExecutiveById = async (req, res) => {
  const exec = await Executive.findById(req.params.id);
  if (!exec) return res.status(404).json({ error: "Not found" });
  res.status(200).json(exec);
};

exports.updateExecutive = async (req, res) => {
  const { name, designation, postalAddress, email, mobile, biodata } = req.body;

  const updatedData = {
    name,
    designation,
    postalAddress,
    email,
    mobile,
    biodata,
  };

  if (req.file) {
    updatedData.image = req.file.path;
  }

  const updated = await Executive.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  res.status(200).json(updated);
};

exports.deleteExecutive = async (req, res) => {
  await Executive.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Deleted successfully" });
};
