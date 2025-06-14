const Campground = require('../models/campground');
module.exports.index =async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}

module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new');
}

module.exports.createCampground =(async (req, res,next) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id; // Set the author to the currently logged-in user
    if (!campground) {
      req.flash('error', 'Failed to create campground');
      return res.redirect('/campgrounds/new');
    }
  await campground.save();
    req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);

})

module.exports.showCampground =async (req, res) => {
  const { id } = req.params
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');// populate means to replace the ObjectId with the actual document
    
    if (!campground) {
      req.flash('error', 'Campground not found');
      return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm =async (req, res) => {
  const { id } = req.params;

  const campground = await Campground.findById(id);
    if (!campground) {
      req.flash('error', 'Campground not found');
      return res.redirect('/campgrounds');
    }

  res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground =async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
    req.flash('success', 'Successfully updated campground!');
  res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground =async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  req.flash('success', 'Successfully deleted campground!');
  res.redirect('/campgrounds');
}