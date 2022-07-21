/* eslint-disable camelcase */
const knex = require('../knex');

// MESSAGES DATA
const createMessage = (msg) => {
  return knex('messages')
    .insert({...msg})
    .then(() => msg)
    .catch(e => console.log(e.message));
};

const getListingMessages = (id) => {
  return knex('messages')
    .where({listing_id: id})
    .orderBy('created_at', 'desc')
    .then((res) => res)
    .catch(e => console.log(e.message));
};

module.exports = {
  createMessage,
  getListingMessages
};