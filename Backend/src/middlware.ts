import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: { id: number };
        }
    }
}

interface JwtPayload {
    id: number;
    userId:number

}

export const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
       

        // Attach user information to the request object
        req.user = { id: decoded.userId  };
       

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error verifying token:", (error as Error).message);
        return res.status(401).json({ message: "Invalid token: " + (error as Error).message });
    }
}; 
