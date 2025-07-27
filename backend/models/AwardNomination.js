const mongoose = require("mongoose");

const awardNominationSchema = new mongoose.Schema(
  {
    mainContent: {
      type: String,
      required: true,
    },
    instructions: {
      type: [String], // array of bullet points
      required: true,
    },
    links: {
      type: [String], // array of links
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AwardNomination", awardNominationSchema);
