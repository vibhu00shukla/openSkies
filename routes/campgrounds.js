const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync'); 
const Campground = require('../models/campground');
const campgroundController = require('../controllers/campgroundController');

const Joi = require('joi');
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');
const { renderNewForm } = require('../controllers/campgroundController');

router.get('/', catchAsync(campgroundController.index));

router.get('/new', isLoggedIn, renderNewForm);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundController.createCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.renderEditForm));

router.put('/:id', isLoggedIn, validateCampground, catchAsync(campgroundController.updateCampground));

router.get('/:id', catchAsync(campgroundController.showCampground));

router.delete('/:id', isLoggedIn, catchAsync(campgroundController.deleteCampground));



module.exports = router;
