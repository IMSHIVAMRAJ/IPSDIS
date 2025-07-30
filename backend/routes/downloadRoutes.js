const express = require("express");
const router = express.Router();
const {
  createDownload,
  getAllDownloads,
  deleteDownload,
} = require("../controllers/downloadController");
const protect = require("../middleware/authMiddleware");
const uploadPdf = require("../middleware/uploadPdf"); // 👈 new one

router.post("/", protect, uploadPdf.single("pdf"), createDownload);
router.get("/", getAllDownloads);
router.delete("/:id", protect, deleteDownload);

module.exports = router;
