/* eslint-disable camelcase */
const knex = require('../knex');


// IMAGES DATA

const getListingImages = (id) => {

  return knex('images')
    .where({listing_id: id})
    .then((res) => res)
    .catch(e => console.log(e.message));
};

const uploadImageData = (img) => {
  return knex('images')
    .insert({...img})
    .then(() => img);
};

module.exports = {
  getListingImages,
  uploadImageData
};