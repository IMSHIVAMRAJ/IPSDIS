const mongoose = require("mongoose");

const editorialBoardSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    areasOfSpecialization: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("EditorialBoard", editorialBoardSchema);
