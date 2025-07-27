const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

router.post("/", protect, upload.single("image"), createNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.put("/:id", protect, upload.single("image"), updateNews);
router.delete("/:id", protect, deleteNews);

module.exports = router;
