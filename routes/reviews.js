const express = require('express');
const router = express.Router({mergeParams: true}); // mergeParams allows us to access params from the parent route
const catchAsync = require('../utils/catchAsync');  
const Campground = require('../models/campground'); 
const { reviewSchema } = require('../schema.js');
const Review = require('../models/review');
const Joi = require('joi');
const { isLoggedIn,isAuthor, isReviewAuthor } = require('../middleware');
const { validateReview } = require('../middleware');
const reviewsController = require('../controllers/reviewsController');


router.post('/',isLoggedIn,validateReview, catchAsync(reviewsController.createReview));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(reviewsController.deleteReview));

module.exports = router;