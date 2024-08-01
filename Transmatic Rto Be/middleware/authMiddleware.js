// authMiddleware.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export function authenticateToken(req, res, next) {
    const accessToken = req.cookies.access_token; // Assuming the access token is stored in a cookie named 'access_token'
    if (!accessToken) {
        return res.status(401).json({message: 'Access token missing'});
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Invalid token'});
        }
        // Optionally, you can attach the decoded data to the request object for use in subsequent middleware or routes
        req.user = decoded;
        next();
    });
}

