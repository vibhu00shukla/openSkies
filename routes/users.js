const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const {storeReturnTo} = require('../middleware');
const usersController = require('../controllers/usersControllers');

router.get('/register', usersController.registerForm);

router.post('/register', catchAsync(usersController.renderRegister));

router.get('/login',usersController.renderLogin);


router.post('/login',storeReturnTo, usersController.login);

router.get('/logout', usersController.logout);

module.exports = router;