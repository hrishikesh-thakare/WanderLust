const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    country: Joi.string().required(),
    image: Joi.string().allow(null, ""),
    location: Joi.string().required(),
    category: Joi.string()
      .valid(
        "Beach",
        "Camping",
        "Farms",
        "Arctic",
        "Cities",
        "Mountains",
        "Deserts",
        "Lakes",
        "Rooms",
        "Pools",
        "Historical"
      )
      .required(),
    geometry: Joi.object({
      type: Joi.string().valid("Point").default("Point"),
      coordinates: Joi.array().items(Joi.number()).length(2).default([0, 0]),
    }).optional(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});
