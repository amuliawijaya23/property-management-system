/* eslint-disable camelcase */
const knex = require('../knex');

// GET ALL LISTINGS FOR AN ORGANIZATION

const getListings = (org) => {
  return knex('listings')
    .where({organization_id: org})
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
  const query =  knex('listings')
    .select('listings.id', 'listings.title', 'listings.description', 'address', 'property_type', 'service_type', 'zip_code', 'size', 'number_of_bedrooms', 'number_of_bathrooms', 'parking_space', 'valuation', 'market_valuation', 'status', 'date_closed', 'listings.organization_id', 'listings.agent_id', 'listings.created_at', 'listings.updated_at')
    .from('listings')
    .leftJoin('users', {'users.id': 'listings.agent_id'})
    .whereILike('listings.status', `%${search}%`)
    .orWhereILike('listings.title', `%${search}%`)
    .orWhereILike('listings.address', `%${search}%`)
    .orWhereILike('listings.property_type', `%${search}%`)
    .orWhereILike('listings.service_type', `%${search}%`)
    .orWhereILike('name', `%${search}%`)
    .orWhereILike('email', `%${search}%`);

  if (search.toLowerCase().split('-')[0] === 'list') {
    const searchId = search.split('-')[1];
    if (searchId && !isNaN(searchId)) {
      query.orWhere('listings.id', '=', parseInt(searchId));
    }
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