/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { uploadFile } = require('../s3');
const { upload } = require('../multer');
const { getListings, addListing, getListing, getListingWatchers, updateListing } = require('../../db/db');

router.get('/listings/:id', async(req, res) => {
  const listings = await getListings(req.params.id);
  res.send(listings);
});

router.get('/listing/:id', async(req, res) => {
  const listing = await getListing(req.params.id);
  res.send(listing);
});

router.get('/watchers/:id', async(req, res) => {
  try {
    const watchers = await getListingWatchers(req.params.id);
    res.send(watchers);

  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});

router.post('/listings', async(req, res) => {
  const result = await addListing({...req.body});
  res.send(result);
});

router.put('/listing', async(req, res) => {
  const update = {...req.body};
  const result = await updateListing(update);
  res.send(result);
});

module.exports = router;