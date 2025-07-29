const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main()
    .then(() => {console.log('Connected to MongoDB');})
    .catch(err => console.error('MongoDB connection error:', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get('/', (req, res) => {
  res.send('root is working');
});

//Index route
app.get('/listings', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index.ejs', { allListings });
});  

// New route
app.get('/listings/new', (req, res) => {
  res.render('listings/new.ejs');
});

// Show route
app.get('/listings/:id', async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/show.ejs', { listing });
}); 

// Create route
app.post('/listings', async (req, res) => {
  const newLisitng = new Listing(req.body.listing);
  await newLisitng.save();
  res.redirect("/listings")
});

// Edit route
app.get('/listings/:id/edit', async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/edit.ejs',{ listing });
});

// Update route
app.put('/listings/:id', async (req, res) => {
  let { id } = req.params;
  console.log('Update data:', req.body);
  await Listing.findByIdAndUpdate(id, {...req.body.listing}, { runValidators: true });
  res.redirect(`/listings/${id}`);
});

// Delete route
app.delete('/listings/:id', async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log("Deleted Listing:", deletedListing)
  res.redirect('/listings');
});

// app.get('/testListings', async (req, res) => {
//     let sampleListing = new Listing({
//         title: 'My Villa',    
//         description: 'By the beach',
//         price: 1200,
//         location: 'Miami, FL',
//         country: 'USA',

//     });
    
//     await sampleListing.save();
//     console.log('Sample listing created:', sampleListing);
//     res.send('Sample listing created successfully');
// });


app.listen(8080, () => {
  console.log('Server is running on http://localhost:3000');
});