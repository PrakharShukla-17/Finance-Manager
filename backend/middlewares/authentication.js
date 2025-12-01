import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {
    const authHeader = req.headers.token;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach decoded payload to request object
        req.user = decoded;

        next(); // Pass control to next middleware/controller

    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
