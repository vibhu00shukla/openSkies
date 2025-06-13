const mongoose = require('mongoose');
const Review = require('./review'); // used to create a collection in the database
const Schema = mongoose.Schema;
const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User' // reference to the User model
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
})
module.exports = mongoose.model('Campground', CampgroundSchema);

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});