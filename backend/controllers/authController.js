const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Check against .env credentials
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.status(200).json({ token });
};
