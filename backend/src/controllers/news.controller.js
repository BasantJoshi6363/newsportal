import News from "../models/news.model.js";
import cloudinary from "../config/cloudinary.js";


// CREATE NEWS
export const createNews = async (req, res) => {
  try {

    const { title, description, category } = req.body;
    console.log(req.body);

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "newsportal",
      }
    );

    const news = await News.create({
      title,
      description,
      category,
      image: result.secure_url,
      writtenBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "News Created",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL NEWS
export const getAllNews = async (req, res) => {
  try {
    
    const news = await News.find()
      .populate("writtenBy", "name email role")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      news,
      
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE NEWS
export const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate("writtenBy", "name email role");

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE NEWS
export const updateNews = async (req, res) => {
  try {
    const { title, description } = req.body;

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    // update image if uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "newsportal",
        }
      );

      news.image = result.secure_url;
    }

    news.title = title || news.title;
    news.description =
      description || news.description;

    await news.save();

    res.status(200).json({
      success: true,
      message: "News Updated",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE NEWS
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    await news.deleteOne();

    res.status(200).json({
      success: true,
      message: "News Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

