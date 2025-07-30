const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membershipController");
const protect = require("../middleware/authMiddleware");

router.post("/create",protect, membershipController.createMembership);
router.get("/get", membershipController.getAllMemberships);
router.get("/:id", membershipController.getMembershipById);
router.put("/:id",protect, membershipController.updateMembership);
router.delete("/:id",protect, membershipController.deleteMembership);

module.exports = router;
