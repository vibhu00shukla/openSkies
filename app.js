
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodoOverride = require('method-override');
app.use(methodoOverride('_method'));
const Campground = require('./models/campground'); // Uncomment if you have a Campground model
app.use(express.urlencoded({ extended: true }));


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
app.post('/campgrounds', async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
})
app.get('/campgrounds/:id/edit', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.render('campgrounds/edit', { campground });
})
app.put('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.redirect(`/campgrounds/${campground._id}`);
})
app.get('/campgrounds/:id', async (req, res) => {
  const { id } = req.params
    const campground = await Campground.findById(id);
    if (!campground) {
      return res.status(404).send('Campground not found');
    }
    res.render('campgrounds/show', { campground });
}
)
app.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  if (!campground) {
    return res.status(404).send('Campground not found');
  }
  res.redirect('/campgrounds');
})
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})