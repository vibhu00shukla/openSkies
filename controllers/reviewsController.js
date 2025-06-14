const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview =async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id; // Set the author to the currently logged-in user
  console.log(campground);
  campground.reviews.push(review);
  await campground.save();
  await review.save();
    req.flash('success', 'Successfully added a new review!');
  res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview =async (req, res) => {
  const { id, reviewId } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  campground.reviews.pull(reviewId);
  await campground.save();
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review deleted successfully!');
  res.redirect(`/campgrounds/${campground._id}`);
}