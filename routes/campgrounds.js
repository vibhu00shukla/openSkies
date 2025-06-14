const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync'); 
const Campground = require('../models/campground');
const campgroundController = require('../controllers/campgroundController');

const Joi = require('joi');
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');
const { renderNewForm } = require('../controllers/campgroundController');

router.route('/')
  .get(catchAsync(campgroundController.index))
  .post(isLoggedIn, validateCampground, catchAsync(campgroundController.createCampground));

router.get('/new', isLoggedIn, renderNewForm);

router.route('/:id')
 .get(catchAsync(campgroundController.showCampground))
  .put(isLoggedIn, validateCampground, catchAsync(campgroundController.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.renderEditForm));

module.exports = router;
