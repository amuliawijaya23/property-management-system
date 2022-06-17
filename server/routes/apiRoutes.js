/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { getListings, addListing } = require('../../db/db');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './media/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/listings', (req, res) => {
  getListings()
    .then((response) => {
      res.json(response);
    })
    .catch(e => console.log(e.message));
});

router.post('/listings', upload.single('thumbnailImage'), (req, res) => {

  const listing = {
    title: req.body.title,
    description: req.body.description,
    street_address: req.body.streetAddress,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postalCode,
    country: req.body.country,
    property_type: req.body.type,
    size: req.body.size,
    number_of_bedrooms: req.body.bedrooms,
    number_of_bathrooms: req.body.bathrooms,
    parking_space: req.body.parking,
    cover_image_url: req.file.path,
    organization_id: req.body.organization_id,
    seller_id: req.body.seller_id,
    price: req.body.price
  };

  addListing(listing)
    .then((response) => {
      res.json(response);
    })
    .catch(e => console.log(e.message));
});

module.exports = router;