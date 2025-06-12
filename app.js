
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
// const joi = require('joi');
// // const { campgroundSchema ,reviewSchema } = require('./schema.js'); 
// const catchAsync = require('./utils/catchAsync'); 
// const expressError = require('./utils/ExpressError'); 
const methodoOverride = require('method-override');
// const Campground = require('./models/campground'); 
// const Review = require('./models/review'); 

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');



app.use(methodoOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));// Use method-override to support PUT and DELETE methods in forms

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);





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






app.all(/(.*)/, (req, res, next) => {
  next(new expressError('Page not found', 404));
  console.log("404 hit for", req.url);
});


app.use((err, req, res, next) => {
  const { statusCode = 500}  =  err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error',{err});
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})
