/* eslint-disable camelcase */
const knex = require('../knex');

const getListingFiles = (id) => {
  return knex('files')
    .where({listing_id: id})
    .orderBy('created_at', 'desc')
    .then((res) => res)
    .catch(e => console.log(e.message));
};

const uploadFileData = (file) => {
  return knex('files')
    .insert({ ...file })
    .then(() => file)
    .catch((e) => console.log(e.message));
};

const updateFileData = (file) => {
  return knex('files')
    .where({ id: file.id })
    .update({ ...file })
    .returning('*')
    .catch((e) => console.log(e.message));
};

const getListingOffer = (id) => {
  return knex('files')
    .where({ is_offer: true, is_archived: false, listing_id: id })
    .then((res) => res[0])
    .catch((e) => console.log(e.message));
};

module.exports = {
  getListingOffer,
  uploadFileData,
  getListingFiles,
  updateFileData
};