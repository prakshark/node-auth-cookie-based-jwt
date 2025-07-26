import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function protectFunction (req, res, next) {
    const currCookie = req.cookies.AccessControlCookie;
    if(!currCookie) {
        res.status(401).json({
            status: 401,
            message: "Cookie not found"
        })
    }

    const mysecretkey = process.env.SECRET_KEY;
    const verifiedRequest = jwt.verify(currCookie, mysecretkey);
    if(verifiedRequest) {
        next();
    }
    else {
        res.status(401).json({
            status: 401,
            message: "Invalid Token, Unautorized access"
        })
    }
}