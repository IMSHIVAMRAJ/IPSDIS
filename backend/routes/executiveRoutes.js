const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const {
  createExecutive,
  getAllExecutives,
  getExecutiveById,
  updateExecutive,
  deleteExecutive,
} = require("../controllers/executiveController");

router.post("/", protect, upload.single("image"), createExecutive);
router.get("/get", getAllExecutives);
router.get("/:id", getExecutiveById);
router.put("/:id", protect, upload.single("image"), updateExecutive);
router.delete("/:id", protect, deleteExecutive);

module.exports = router;
