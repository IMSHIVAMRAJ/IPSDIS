const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createAward,
  getAllAwards,
  getAwardById,
  updateAward,
  deleteAward,
} = require("../controllers/awardController");

router.post("/", protect, createAward);
router.get("/", getAllAwards);
router.get("/:id", getAwardById);
router.put("/:id", protect, updateAward);
router.delete("/:id", protect, deleteAward);

module.exports = router;
