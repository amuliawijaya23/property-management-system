require('dotenv').config({ path: '../.env' });

// declare config and environment
const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];

// exports knex with the specified config
module.exports = require('knex')(knexConfig);