const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    editors: [String],
    year: Number,
    pages: Number,
    price: Number,
    isbn: String,
    about: String,
    contents: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
