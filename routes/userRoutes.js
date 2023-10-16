const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const user = require('../models/user');

router.get('/count', userController.getUserCount);
router.get('/:id', userController.getUserById);
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/verify/:code', userController.verifyEmail);
router.get('/sendVerificationEmail/:id', userController.sendVerificationEmail);

module.exports = router;
