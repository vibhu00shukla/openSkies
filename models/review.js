const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('Review', reviewSchema);//used to create a collection in the database
// The collection will be named 'reviews' in the database, as Mongoose pluralizes the model name by default.