const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const { name, editors, year, pages, price, isbn, about, contents } = req.body;
    const image = req.file?.path;

    const book = new Book({
      name,
      editors,
      year,
      pages,
      price,
      isbn,
      about,
      contents,
      image,
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.status(200).json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.status(200).json(book);
};

exports.updateBook = async (req, res) => {
  const { name, editors, year, pages, price, isbn, about, contents } = req.body;
  const updated = {
    name,
    editors,
    year,
    pages,
    price,
    isbn,
    about,
    contents,
  };

  if (req.file) updated.image = req.file.path;

  const book = await Book.findByIdAndUpdate(req.params.id, updated, { new: true });
  res.status(200).json(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Book deleted" });
};
