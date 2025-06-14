const { campgroundSchema ,reviewSchema } = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');
const Campground = require('./models/campground');


module.exports.isLoggedIn = (req, res, next) => {

  if (req.isAuthenticated()) {

    return next();
  }
  req.session.returnTo = req.originalUrl; // Store the original URL to redirect after login
  req.flash('error', 'You must be logged in to access that page');
  res.redirect('/login');
};

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
module.exports.validateCampground = (req, res, next) => {
  const {error} = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ExpressError(msg, 400));
  }
  else{
    next();
  }
}
module.exports.isAuthor =async  (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to edit this campground');
    return res.redirect(`/campgrounds/${campground._id}`);
  }
  next();
}
const Review = require('./models/review');

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash('error', 'Review not found');
        return res.redirect('back');
    }
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
};


module.exports.validateReview = (req, res, next) => {
  const {error} = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ExpressError(msg, 400));
  }
  else{
    next();
  }
}