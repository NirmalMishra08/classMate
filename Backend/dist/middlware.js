"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticatedUser = (req, res, next) => {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;
    // Ensure the Authorization header is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized, token missing or malformed" });
    }
    // Extract the token
    const token = authHeader.split(" ")[1];
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach user information to the request object
        req.user = { id: decoded.userId };
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error("Error verifying token:", error.message);
        return res.status(401).json({ message: "Invalid token: " + error.message });
    }
};
exports.authenticatedUser = authenticatedUser;
