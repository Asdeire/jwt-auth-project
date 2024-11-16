const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (user) => {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
const verifyToken = (token) => {
    try {
        console.log('Verifying token with secret:', process.env.JWT_SECRET);
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Token verification failed:', error.message);
        throw new Error('Invalid token');
    }
};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
};
