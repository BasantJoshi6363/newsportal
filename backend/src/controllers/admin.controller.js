import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const generateAccessToken = (userId) => {
    return jwt.sign(
        {
            id: userId
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export const register = async (req, res) => {
    try {

        const { name, phoneNo, email, password, role } =
            req.body;

        const existingUser = await Admin.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Admin already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            phoneNo,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            success: true,
            admin: {
                name, phoneNo, email, role
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const accessToken = generateAccessToken(admin._id);

        const refreshToken = generateRefreshToken(admin._id);

        admin.refreshToken = refreshToken;

        await admin.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            success: true,
            message: "Login Success",
            admin: {
                name: admin.name,
                id: admin._id,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const getProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        const admin = await Admin.findById(adminId);


        res.status(200).json({
            success: true,
            message: "user profile fetched",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                admin: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const logout = async (req, res) => {

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
        success: true,
        message: "Logout Success",
    });
};

