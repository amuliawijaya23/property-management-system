/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { uploadFile } = require('../s3');
const { upload } = require('../multer');
const { getListings, addListing } = require('../../db/db');

// router.post('/images', upload.single('file'), uploadFile);
router.get('/listings/:id', async(req, res) => {
  const listings = await getListings(req.params.id);
  res.send(listings);
});

router.post('/listings', upload.single('thumbnailImage'), async(req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  const listing = {...req.body, cover_image_url: `app/images/${result.key}`};
  const newListing = await addListing(listing);
  const listings = await getListings(newListing.organization_id);
  res.send(listings);
});

module.exports = router;