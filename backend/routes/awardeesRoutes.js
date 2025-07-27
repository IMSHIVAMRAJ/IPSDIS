const express = require("express");
const router = express.Router();
const awardeeController = require("../controllers/awardeeController");

router.post("/", awardeeController.createAwardee);
router.get("/", awardeeController.getAllAwardees);
router.get("/:id", awardeeController.getAwardeeById);
router.put("/:id", awardeeController.updateAwardee);
router.delete("/:id", awardeeController.deleteAwardee);

module.exports = router;
