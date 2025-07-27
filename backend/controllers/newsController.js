const News = require("../models/News");

exports.createNews = async (req, res) => {
  try {
    // console.log("Body:", req.body);
    // console.log("File:", req.file);

    const { title, date, bigContent, links } = req.body;
    const image = req.file?.path;

    const news = new News({
      title,
      date,
      image,
      bigContent,
      links: links ? JSON.parse(links) : [],
    });

    await news.save();
    res.status(201).json(news);
  } catch (err) {
    console.error("❌ Error creating news:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNews = async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.status(200).json(news);
};

exports.getNewsById = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ error: "News not found" });
  res.status(200).json(news);
};

exports.updateNews = async (req, res) => {
  const { title, date, bigContent, links } = req.body;
  const updatedData = {
    title,
    date,
    bigContent,
    links: links ? JSON.parse(links) : [],
  };

  if (req.file) {
    updatedData.image = req.file.path;
  }

  const news = await News.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  res.status(200).json(news);
};

exports.deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "News deleted" });
};
