const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

//Index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Cannot find that listing!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

// Create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect("/listings");
  })
);

// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Cannot find that listing!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// Update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError("Invalid Listing Data", 400);
    }
    let { id } = req.params;
    console.log("Update data:", req.body);
    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { runValidators: true }
    );
    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${id}`);
  })
);

// Delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted Listing:", deletedListing);
    req.flash("success", "Successfully deleted a listing!");
    res.redirect("/listings");
  })
);

module.exports = router;
