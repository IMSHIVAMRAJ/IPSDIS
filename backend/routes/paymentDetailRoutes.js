const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentDetailController");
const protect = require("../middleware/authMiddleware");

router.post("/create",protect, controller.createPaymentDetail);
router.get("/get",controller.getAllPaymentDetails);
router.get("/:id", protect,controller.getPaymentDetailById);
router.put("/:id",protect, controller.updatePaymentDetail);
router.delete("/:id",protect, controller.deletePaymentDetail);

module.exports = router;
