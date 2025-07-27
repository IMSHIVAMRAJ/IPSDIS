const Membership = require("../models/Membership");

exports.createMembership = async (req, res) => {
  try {
    const { membershipInfo, nationality, membershipType, membershipFee, gst, total } = req.body;

    const membership = new Membership({
      membershipInfo,
      nationality,
      membershipType,
      membershipFee,
      gst,
      total,
    });

    await membership.save();
    res.status(201).json(membership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMemberships = async (req, res) => {
  const memberships = await Membership.find().sort({ createdAt: -1 });
  res.status(200).json(memberships);
};

exports.getMembershipById = async (req, res) => {
  const membership = await Membership.findById(req.params.id);
  if (!membership) return res.status(404).json({ error: "Membership not found" });
  res.status(200).json(membership);
};

exports.updateMembership = async (req, res) => {
  const { membershipInfo, nationality, membershipType, membershipFee, gst, total } = req.body;

  const updated = {
    membershipInfo,
    nationality,
    membershipType,
    membershipFee,
    gst,
    total,
  };

  const membership = await Membership.findByIdAndUpdate(req.params.id, updated, { new: true });
  res.status(200).json(membership);
};

exports.deleteMembership = async (req, res) => {
  await Membership.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Membership deleted" });
};
