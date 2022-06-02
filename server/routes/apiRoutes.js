require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

const { getListings } = require('../../db/db');

router.get('', (req, res) => {
  res.json({message: 'HELLO FROM SERVER!'});
});

router.get('/listings', (req, res) => {
  getListings()
    .then((response) => {
      // console.log(response);
      res.json(response);
    })
    .catch(e => console.log(e.message));
});

module.exports = router;