import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { protectFunction } from "./middlewares/protect.js";


import authRoutes from "./routes/auth.route.js";
import protectedRoutes from "./routes/protectedRoute.route.js";
import { dbConnect } from "./db/db.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

// Middlewares:-
app.use(express.json());
app.use(cors());
app.use(cookieParser())

// Routes:-
app.use("/api/auth", authRoutes);
app.use("/api/testProtected", protectFunction, protectedRoutes);

// Ensure DB is connected before starting server
dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB", err);
});