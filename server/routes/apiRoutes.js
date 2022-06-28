/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { uploadFile } = require('../s3');
const { upload } = require('../multer');
const { getListings, addListing, getListing } = require('../../db/db');

router.get('/listings/:id', async(req, res) => {
  const listings = await getListings(req.params.id);
  res.send(listings);
});

router.get('/listing/:id', async(req, res) => {
  const listing = await getListing(req.params.id);
  res.send(listing);
});

router.post('/listings', upload.single('thumbnailImage'), async(req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  const listing = {...req.body, cover_image_url: `/images/${result.key}`};
  
  await addListing(listing);

  const allListings = await getListings(listing.organization_id);

  // const getListingId = await getListingSum();
  res.send(allListings);
});

module.exports = router;