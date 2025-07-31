const mongoose = require("mongoose");

const membershipRegistrationSchema = new mongoose.Schema({
  name:{
  type:String,
  required:true
  },
  nationality: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  areaOfSpecialization: {
    type: String,
    required: true,
  },
  membershipType: {
    type: String,
    required: true,
  },
  membershipFee: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("MembershipRegistration", membershipRegistrationSchema);
