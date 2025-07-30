const express = require("express");
const router = express.Router();
const controller = require("../controllers/awardNominationController");
const protect = require("../middleware/authMiddleware");

router.post("/",protect, controller.createNomination);
router.get("/", controller.getAllNominations);
router.get("/:id", controller.getNominationById);
router.put("/:id",protect, controller.updateNomination);
router.delete("/:id", protect,controller.deleteNomination);

module.exports = router;
