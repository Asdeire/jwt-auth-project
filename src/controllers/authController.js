const { signUp, signIn } = require('../services/authService');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../services/tokenService');

const signUpController = (req, res) => {
    const { username, password } = req.body;

    try {
        const user = signUp(username, password);
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const signInController = (req, res) => {
    const { username, password } = req.body;

    try {
        const { accessToken, refreshToken } = signIn(username, password);

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const logOutController = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
};

const infoController = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
        res.json({ user });
    } catch (error) {
        res.status(403).json({ message: 'Token is not valid' });
    }
};

const refreshController = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const user = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Refresh token is not valid' });
    }
};

module.exports = { signUpController, signInController, logOutController, infoController, refreshController };
