const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    },
    price: {   
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://via.https://unsplash.com/photos/sunbed-and-parasol-on-empty-sandy-beach-during-low-season-or-early-in-the-morning-sea-and-ocean-paradise-and-vacation-concept-olsYQkcRd5w.com/150',
        set: (v) => v == "" ? 'https://via.https://unsplash.com/photos/sunbed-and-parasol-on-empty-sandy-beach-during-low-season-or-early-in-the-morning-sea-and-ocean-paradise-and-vacation-concept-olsYQkcRd5w.com/150' : v,
    },
    country: {
        type: String
    }
});

module.exports = mongoose.model('Listing', listingSchema);