const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Download", downloadSchema);
