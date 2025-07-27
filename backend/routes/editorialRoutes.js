const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createEditorial,
  getAllEditorials,
  getEditorialById,
  updateEditorial,
  deleteEditorial,
} = require("../controllers/editorialController");

router.post("/", protect, createEditorial);
router.get("/", getAllEditorials);
router.get("/:id", getEditorialById);
router.put("/:id", protect, updateEditorial);
router.delete("/:id", protect, deleteEditorial);

module.exports = router;
