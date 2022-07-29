/* eslint-disable camelcase */
const knex = require('../knex');

// GET ALL LISTINGS FOR AN ORGANIZATION

const getListings = (param) => {
  return knex('listings')
    .where({...param})
    .then((res)  => res)
    .catch(e => console.log(e.message));
};

const getListing = (id) => {
  return knex('listings')
    .where({id: id})
    .then((res) => res[0])
    .catch(e => console.log(e.message));
};

const addListing = (listing) => {
  return knex('listings')
    .insert({...listing})
    .returning('*')
    .catch(e => console.log(e.message));
};

const getListingSum = () => {
  return knex('listings')
    .count('id')
    .catch(e => console.log(e.message));
};

const updateListing = (data) => {
  return knex('listings')
    .where({ id: data.id})
    .update({...data})
    .returning('*')
    .catch((e) => console.log(e.message));
};

// WATCHERS DATA

const getListingWatchers = (id) => {
  return knex('listing_watchers')
    .where({listing_id: id, isWatcher: true})
    .then((res) => res)
    .catch((error) => error);
};

const getWatcherById = (watcher) => {
  return knex('listing_watchers')
    .where({user_id: watcher.user_id, listing_id: watcher.listing_id})
    .then((res => res))
    .catch((e) => console.log(e.message));
};

const addListingWatchers = (watcher) => {
  return knex('listing_watchers')
    .insert({ ...watcher })
    .returning('*')
    .catch((e) => console.log(e.message));
};

const updateWatcher = (watcher) => {
  return knex('listing_watchers')
    .where({user_id: watcher.user_id, listing_id: watcher.listing_id})
    .update({...watcher})
    .returning('*')
    .catch((e) => console.log(e.message));
};

const removeWatcher = (watcher) => {
  return knex('listing_watchers')
    .where({user_id: watcher.user_id, listing_id: watcher.listing_id })
    .update({...watcher})
    .catch((e) => console.log(e.message));
};

const searchListings = (search) => {
  const searchTerm = (() => {
    const term = search.trim().toLowerCase();
    const arrId = term.split('-');
    if (arrId[0] === 'list' && arrId.length === 2) {
      return arrId[1];
    }
    return term;
  })();
  const query =  knex('listings')
    .select('listings.id', 'listings.title', 'listings.description', 'address', 'property_type', 'service_type', 'postal_code', 'size', 'number_of_bedrooms', 'number_of_bathrooms', 'parking_space', 'valuation', 'market_valuation', 'status', 'date_closed', 'listings.organization_id', 'listings.agent_id', 'listings.created_at', 'listings.updated_at')
    .from('listings')
    .leftJoin('users', { 'users.id': 'listings.agent_id' })
    .whereILike('listings.status', `%${searchTerm}%`)
    .orWhereILike('listings.title', `%${searchTerm}%`)
    .orWhereILike('listings.address', `%${searchTerm}%`)
    .orWhereILike('listings.property_type', `%${searchTerm}%`)
    .orWhereILike('listings.service_type', `%${searchTerm}%`)
    .orWhereILike('name', `%${searchTerm}%`)
    .orWhereILike('email', `%${searchTerm}%`);

  searchTerm.split(' ').forEach((t) => {
    query.orWhereILike('listings.title', `%${t}%`)
      .orWhereILike('listings.address', `%${t}%`)
      .orWhereILike('name', `%${t}%`)
      .orWhereILike('email', `%${t}%`);
  });

  if (searchTerm && !isNaN(searchTerm)) {
    query.orWhere('listings.id', '=', parseInt(searchTerm));
  }

  return query.then((res) => res)
    .catch((e) => console.log(e.message));
};

module.exports = {
  getListings,
  getListing,
  addListing,
  updateListing,
  getListingSum,
  getListingWatchers,
  addListingWatchers,
  removeWatcher,
  getWatcherById,
  updateWatcher,
  searchListings
};