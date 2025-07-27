const express = require("express");
const router = express.Router();
const controller = require("../controllers/awardNominationController");

router.post("/award-nomination", controller.createNomination);
router.get("/award-nomination", controller.getAllNominations);
router.get("/award-nomination/:id", controller.getNominationById);
router.put("/award-nomination/:id", controller.updateNomination);
router.delete("/award-nomination/:id", controller.deleteNomination);

module.exports = router;
