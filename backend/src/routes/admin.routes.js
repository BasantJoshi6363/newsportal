import express from "express";

import {
    register,
    login,
    logout,
    getProfile,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";


const adminRouter = express.Router();

adminRouter.post("/register", register);

adminRouter.post("/login", login);

adminRouter.post("/logout", authMiddleware, logout);
adminRouter.get("/profile", authMiddleware, getProfile);


export default adminRouter;