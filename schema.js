const joi = require('joi'); //joi is a validation library for JavaScript objects
  module.exports.campgroundSchema= joi.object({
    campground: joi.object({
      title: joi.string().required(),
      location: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required().min(0),
      image: joi.string().required(),
    }).required()
  });

module.exports.reviewSchema = joi.object({
  review: joi.object({
    body: joi.string().required(),
    rating: joi.number().required().min(1).max(5)
  }).required()
})