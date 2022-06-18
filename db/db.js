/* eslint-disable camelcase */
const knex = require('./knex');

const getListings = (org) => {
  return knex('listings')
    .where({organization_id: org})
    .then((res)  => res)
    .catch(e => console.log(e.message));
};

const addListing = (listing) => {

  return knex('listings')
    .insert({...listing})
    .then(() => listing)
    .catch(e => console.log(e.message));
};

module.exports = {
  getListings,
  addListing
};