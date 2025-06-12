const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync'); 
const expressError = require('../utils/ExpressError'); 
const Campground = require('../models/campground'); 
const { campgroundSchema } = require('../schema.js');
const Joi = require('joi');

const validateCampground = (req, res, next) => {

  const {error} = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new expressError(msg, 400));
  }
  else{
    next();
  }
}
router.get('/', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
})


router.get('/new', (req, res) => {
  res.render('campgrounds/new');
})


router.post('/', validateCampground ,catchAsync(async (req, res,next) => {

  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);

}))


router.get('/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.render('campgrounds/edit', { campground });
}))


router.put('/:id', validateCampground ,catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.redirect(`/campgrounds/${campground._id}`);
}))


router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params
    const campground = await Campground.findById(id).populate('reviews');
    if (!campground) {
      return res.status(404).send('Campground not found');
    }
    res.render('campgrounds/show', { campground });
}
))

router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.redirect('/campgrounds');
}))



module.exports = router;