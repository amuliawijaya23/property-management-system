const knex = require('./knex');

const getListings = () => {
  return knex('listings')
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