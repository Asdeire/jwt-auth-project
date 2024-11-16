const User = require('../models/user');
const { generateAccessToken, generateRefreshToken } = require('./tokenService');

const signUp = (username, password) => {
    const existingUser = User.findByUsername(username);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const newUser = User.create(username, password);
    return newUser;
};

const signIn = (username, password) => {
    const user = User.findByUsername(username);
    if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken };
};

module.exports = { signUp, signIn };
