const MembershipRegistration = require("../models/MembershipRegistration");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  try {
    // 1. Destructure the request body (confirmPassword is not needed)
    const {
      name,
      nationality,
      email,
      contact,
      password, // Only the final password is taken
      designation,
      address,
      areaOfSpecialization,
      membershipType,
      membershipFee
    } = req.body;

    // 2. Check if a user with this email already exists
    const existingUser = await MembershipRegistration.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    // 3. Securely hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new registration with the hashed password
    const registration = new MembershipRegistration({
      name,
      nationality,
      email,
      contact,
      password: hashedPassword, // Save the secure, hashed password
      designation,
      address,
      areaOfSpecialization,
      membershipType,
      membershipFee,
    });

    await registration.save();
    res.status(201).json({ message: "Registration submitted successfully" });

  } catch (err) {
    console.error("REGISTRATION ERROR:", err);
    res.status(500).json({ error: "Server error during registration." });
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
