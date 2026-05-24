import express from "express";
import { createNews, deleteNews, getAllNews, getSingleNews, updateNews } from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";





const newsRouter = express.Router();


// CREATE NEWS
newsRouter.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  createNews
);


// GET ALL NEWS
newsRouter.get("/", getAllNews);


// GET SINGLE NEWS
newsRouter.get("/:id", getSingleNews);


// UPDATE NEWS
newsRouter.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateNews
);


// DELETE NEWS
newsRouter.delete(
  "/:id",
  authMiddleware,
  deleteNews
);

export default newsRouter;