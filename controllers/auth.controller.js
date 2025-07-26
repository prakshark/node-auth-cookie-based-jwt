import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function registerUser(req, res) {
    const {username, password, confirmPassword} = req.body;
    if(password != confirmPassword) {
        res.status(400).json({
            status: 400,
            message: "Passwords do not match while registering"
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hashedPassword
        })
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export async function loginUser(req, res) {
    const {username, password} = req.body;
    const userWithSameUsername = await User.findOne({username: username});
    if(!userWithSameUsername) {
        res.status(404).json({
            status: 404,
            message: "User with this username does not exists"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, userWithSameUsername.password);
    if(!isPasswordCorrect) {
        res.status(400).json({
            status: 400,
            message: "Incorrect Password Provided"
        })
    }
    const mySecretKey = process.env.SECRET_KEY;

    // Create token and set the token in the cookie :-
    const token = jwt.sign({
        username: userWithSameUsername.username,
        id: userWithSameUsername._id
    }, mySecretKey, {expiresIn: "5h"})

    res.cookie("AccessControlCookie", token, 
        { maxAge: 900000, httpOnly: true }
    )

    res.status(200).json({
        status: 200,
        message: "User logged in and cookie set successfully"
    })
}

export async function logoutUser(req, res) {
    await res.clearCookie("AccessControlCookie");
    res.status(200).json({
        status: 200,
        message: "Cookie deleted and user logged out successfully"
    })
}