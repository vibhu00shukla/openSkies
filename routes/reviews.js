const express = require('express');
const router = express.Router({mergeParams: true}); // mergeParams allows us to access params from the parent route
const catchAsync = require('../utils/catchAsync'); 
const expressError = require('../utils/ExpressError'); 
const Campground = require('../models/campground'); 
const { reviewSchema } = require('../schema.js');
const Review = require('../models/review');
const Joi = require('joi');

const validateReview = (req, res, next) => {
  const {error} = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new expressError(msg, 400));
  }
  else{
    next();
  }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await campground.save();
  await review.save();
  res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  campground.reviews.pull(reviewId);
  await campground.save();
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${campground._id}`);
}))

module.exports = router;