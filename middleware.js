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
