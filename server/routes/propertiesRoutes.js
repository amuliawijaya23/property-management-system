/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getListings, addListing, getListing, getListingWatchers, updateListing, addListingWatchers, getWatcherById, updateWatcher, searchListings } = require('../../db/queries/listing');

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

router.post('/watchers', async(req, res) => {
  try {
    const getWatcher = await  getWatcherById({ ...req.body });
    if (getWatcher.length > 0) {
      await updateWatcher({ ...req.body, isWatcher: true });
      const watchers = await getListingWatchers(req.body.listing_id);
      res.send(watchers);
    } else {
      await addListingWatchers({ ...req.body });
      const watchers = await getListingWatchers(req.body.listing_id);
      res.send(watchers);
    }
  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});

router.post('/listings', async(req, res) => {
  await addListing({...req.body});
  const result = await getListings(req.body.organization_id);
  res.send(result);
});

router.put('/properties', async(req, res) => {
  const update = {...req.body};
  await updateListing(update);
  const result = await getListings(req.body.organization_id);
  res.send(result);
});

router.put('/watchers/remove', async(req, res) => {
  try {
    await updateWatcher({...req.body, isWatcher: false});
    const watchers = await getListingWatchers(req.body.listing_id);
    res.send(watchers);
  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});


router.post('/properties/search', async(req, res) => {
  try {
    const search = req.body.search;
    const result = await searchListings(search);
    res.send(result);
  } catch (error) {
    console.error(error.response ? error.response.body : error);
  }
});

module.exports = router;