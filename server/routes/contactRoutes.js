/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getContacts, updateContacts } = require('../../db/db');

router.get('/contacts/:id', async(req, res) => {
  const id = req.params.id;
  const contacts = await getContacts(id);
  res.send(contacts);
});

router.put('/contacts/', async(req, res) => {
  const update = {...req.body};
  const result = await updateContacts(update);
  res.send(result);
});

module.exports = router;
