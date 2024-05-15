const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const roles = require('../util/tokenRoles');
dotenv.config();




const protect = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('no token')
            return res.status(401).json({ message: 'Unauthorized: Missing or invalid Authorization header' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { role } = decoded;

        const parts = req.path.split("/");
        const startingPart = parts[1]
        const allowedRoles = roles[`/${startingPart}`] || [];


        if (!allowedRoles.includes(role)) {
            console.log('Token Forbidden: Insufficient privileges')
            return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            console.log(' - Invalid token - ')
            return res.status(401).json({ message: 'Invalid token', tokenError: true });
        }

        // Handle other errors appropriately
        console.error(error);
        console.log('Internal server error')
        return res.status(500).json({ message: 'Internal server error', tokenError: true });
    }
});





module.exports = { protect };
