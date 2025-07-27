const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String }, // Cloudinary URL
  bigContent: { type: String },
  links: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);
