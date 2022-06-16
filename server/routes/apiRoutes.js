require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getListings } = require('../../db/db');

router.get('/listings', (req, res) => {
  getListings()
    .then((response) => {
      res.json(response);
    })
    .catch(e => console.log(e.message));
});

module.exports = router;