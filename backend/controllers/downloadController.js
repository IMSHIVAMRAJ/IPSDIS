const Download = require("../models/downloadModel");

const createDownload = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "PDF file is required" });
    }

    const fileUrl = req.file.path; // Cloudinary PDF URL

    const newDownload = new Download({
      title,
      pdfUrl: fileUrl,
    });

    await newDownload.save();

    res.status(201).json({ msg: "Download created successfully", download: newDownload });
  } catch (error) {
    console.error("Error creating download:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllDownloads = async (req, res) => {
  try {
    const downloads = await Download.find().sort({ createdAt: -1 });
    res.status(200).json(downloads);
  } catch (error) {
    console.error("Error fetching downloads:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createDownload,
  getAllDownloads,
};
