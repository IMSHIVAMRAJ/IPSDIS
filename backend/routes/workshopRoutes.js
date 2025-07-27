const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createWorkshop,
  getAllWorkshops,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
} = require("../controllers/workshopController");

router.post("/", protect, createWorkshop);
router.get("/", getAllWorkshops);
router.get("/:id", getWorkshopById);
router.put("/:id", protect, updateWorkshop);
router.delete("/:id", protect, deleteWorkshop);

module.exports = router;
