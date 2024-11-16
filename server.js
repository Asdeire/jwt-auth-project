const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the JWT Authentication API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
});
