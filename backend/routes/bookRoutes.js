const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.post("/", protect, upload.single("image"), createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", protect, upload.single("image"), updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
