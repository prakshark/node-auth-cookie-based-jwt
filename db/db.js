import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function dbConnect() {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log("Connected to MONGODB");
}