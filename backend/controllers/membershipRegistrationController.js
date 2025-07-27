const MembershipRegistration = require("../models/MembershipRegistration");

exports.register = async (req, res) => {
  try {
    const {
      nationality,
      email,
      contact,
      password,
      confirmPassword,
      designation,
      address,
      areaOfSpecialization,
      membershipType,
      membershipFee
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const registration = new MembershipRegistration({
      nationality,
      email,
      contact,
      password,
      designation,
      address,
      areaOfSpecialization,
      membershipType,
      membershipFee,
    });

    await registration.save();
    res.status(201).json({ message: "Registration submitted", registration });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRegistrations = async (req, res) => {
  const registrations = await MembershipRegistration.find().sort({ createdAt: -1 });
  res.status(200).json(registrations);
};

exports.acceptRegistration = async (req, res) => {
  const registration = await MembershipRegistration.findByIdAndUpdate(
    req.params.id,
    { status: "accepted" },
    { new: true }
  );
  res.status(200).json(registration);
};

exports.rejectRegistration = async (req, res) => {
  await MembershipRegistration.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Registration rejected and deleted" });
};
