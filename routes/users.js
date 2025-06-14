const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const {storeReturnTo} = require('../middleware');
const usersController = require('../controllers/usersControllers');



router.route('/register')
  .get(usersController.registerForm)
  .post(catchAsync(usersController.renderRegister));

router.route('/login')
  .get(usersController.renderLogin)
  .post(storeReturnTo, usersController.login);

router.get('/logout', usersController.logout);

module.exports = router;