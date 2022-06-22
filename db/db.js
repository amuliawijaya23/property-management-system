/* eslint-disable camelcase */
const knex = require('./knex');

// GET ALL LISTINGS FOR AN ORGANIZATION

const getListings = (org) => {
  return knex('listings')
    .where({organization_id: org})
    .then((res)  => res)
    .catch(e => console.log(e.message));
};

// POST NEW LISTING

const addListing = (listing) => {

  return knex('listings')
    .insert({...listing})
    .then(() => listing)
    .catch(e => console.log(e.message));
};



// GET LISTING ASSETS, FILES, MESSAGES

const getListingImages = (id) => {

  return knex('images')
    .where({listing_id: id})
    .then((res) => res)
    .catch(e => console.log(e.message));
};

const getListingMessages = (id) => {
  return knex('messages')
    .where({listing_id: id})
    .orderBy('created_at', 'desc')
    .then((res) => res)
    .catch(e => console.log(e.message));
};

// POST NEW ASSETS, FILES, MESSAGES

const uploadImageData = (img) => {
  return knex('images')
    .insert({...img})
    .then(() => img);
};

const createMessage = (msg) => {
  return knex('messages')
    .insert({...msg})
    .then(() => msg)
    .catch(e => console.log(e.message));
};

module.exports = {
  getListings,
  addListing,
  getListingImages,
  getListingMessages,
  uploadImageData,
  createMessage
};