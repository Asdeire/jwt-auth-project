const express = require('express');
const router = express.Router();
const { signUpController, signInController, logOutController, infoController, refreshController } = require('../controllers/authController');

router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.post('/log-out', logOutController);
router.get('/info', infoController);
router.post('/refresh', refreshController);

module.exports = router;
