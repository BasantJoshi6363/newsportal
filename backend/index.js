import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminRouter from "./src/routes/admin.routes.js";
import newsRouter from "./src/routes/news.route.js";
import cors from "cors";
import connectDB from "./src/config/db.js";


dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(
));


app.use("/api/auth", adminRouter);
app.use("/api/news", newsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`server listening at port ${PORT}`);

})