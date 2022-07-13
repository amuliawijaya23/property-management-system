/* eslint-disable camelcase */
const knex = require('./knex');

// GET ALL LISTINGS FOR AN ORGANIZATION

const getListings = (org) => {
  return knex('listings')
    .where({organization_id: org})
    .then((res)  => res)
    .catch(e => console.log(e.message));
};

const getContacts = (org) => {
  return knex('contacts')
    .where({organization_id: org})
    .then((res) => res)
    .catch(e => console.log(e.message));
};

const getTasks = (org) => {
  return knex('tasks')
    .where({organization_id: org})
    .then((res) => res)
    .catch(e => console.log(e.message));
};

// GET LISTING DATA

const getListing = (id) => {
  return knex('listings')
    .where({id: id})
    .then((res) => res[0])
    .catch(e => console.log(e.message));
};

// POST NEW LISTING

const addListing = (listing) => {

  return knex('listings')
    .insert({...listing})
    .returning('*')
    .catch(e => console.log(e.message));
};

const addTask = (task) => {
  return knex('tasks')
    .insert({ ...task })
    .returning('*')
    .catch(e => console.log(e.message));
};

const getListingSum = () => {
  return knex('listings')
    .count('id')
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

const getListingFiles = (id) => {
  return knex('files')
    .where({listing_id: id})
    .orderBy('created_at', 'desc')
    .then((res) => res)
    .catch(e => console.log(e.message));
};

const getListingTasks = (id) => {
  return knex('tasks')
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

const uploadFileData = (file) => {
  return knex('files')
    .insert({ ...file })
    .then(() => file);
};

const getListingWatchers = (id) => {
  return knex('listing_watchers')
    .where({listing_id: id})
    .then((res) => res)
    .catch((error) => error);
};

const addListingWatchers = (watcher) => {
  return knex('listing_watchers')
    .insert({ ...watcher })
    .returning('*')
    .catch((e) => console.log(e.message));
};

const updateListing = (data) => {
  return knex('listings')
    .where({ id: data.id})
    .update({...data})
    .returning('*')
    .catch((e) => console.log(e.message));
};

const updateContacts = (data) => {
  return knex('contacts')
    .where({ id: data.id })
    .update({...data})
    .returning('*')
    .catch((e) => console.log(e.message));
};

const updateTasks = (data) => {
  return knex('tasks')
    .where({ id: data.id })
    .update({...data})
    .returning('*')
    .catch((e) => console.log(e.message));
};

module.exports = {
  getListings,
  getListing,
  addListing,
  getListingSum,
  getListingImages,
  getListingMessages,
  uploadImageData,
  createMessage,
  getListingWatchers,
  updateListing,
  getContacts,
  getTasks,
  updateContacts,
  updateTasks,
  uploadFileData,
  getListingFiles,
  getListingTasks,
  addTask,
  addListingWatchers
};