const multer = require("multer");
const { pdfStorage } = require("../config/cloudinary");

const uploadPdf = multer({ storage: pdfStorage });

module.exports = uploadPdf;
