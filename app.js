
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const joi = require('joi');
const { campgroundSchema ,reviewSchema } = require('./schema.js'); // Assuming you have a schema.js file with the schema defined
const catchAsync = require('./utils/catchAsync'); // Assuming you have a catchAsync utility
const expressError = require('./utils/ExpressError'); 
const methodoOverride = require('method-override');
const Campground = require('./models/campground'); 
const Review = require('./models/review'); // used to create a collection in the database


app.use(methodoOverride('_method'));
// Uncomment if you have a Campground model
app.use(express.urlencoded({ extended: true }));

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


mongoose.connect('mongodb://localhost:27017/openSkies' )



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', ejsMate);// Use ejsMate for layout support
app.set('view engine', 'ejs');
app.set('views',path.join( __dirname , 'views'));

app.get('/', (req, res) => {
  res.render('home')
})


app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
})


app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
})


app.post('/campgrounds', validateCampground ,catchAsync(async (req, res,next) => {

  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);

}))


app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.render('campgrounds/edit', { campground });
}))


app.put('/campgrounds/:id', validateCampground ,catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.redirect(`/campgrounds/${campground._id}`);
}))


app.get('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params
    const campground = await Campground.findById(id).populate('reviews');
    if (!campground) {
      return res.status(404).send('Campground not found');
    }
    res.render('campgrounds/show', { campground });
}
))


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


app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await campground.save();
  await review.save();
  res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
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



app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.redirect('/campgrounds');
}))


app.all(/(.*)/, (req, res, next) => {
  next(new expressError('Page not found', 404));
});


app.use((err, req, res, next) => {
  const { statusCode = 500}  =  err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error',{err});
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})
