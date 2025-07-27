const express = require("express");
const router = express.Router();
const { createDownload, getAllDownloads } = require("../controllers/downloadController");
const protect = require("../middleware/authMiddleware");
const uploadPdf = require("../middleware/uploadPdf"); // 👈 new one

router.post("/", protect, uploadPdf.single("pdf"), createDownload);
router.get("/", getAllDownloads);

module.exports = router;
