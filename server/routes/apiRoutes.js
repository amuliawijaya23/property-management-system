require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

router.get('', (req, res) => {
  res.json({message: 'HELLO FROM SERVER!'});
});

module.exports = router;