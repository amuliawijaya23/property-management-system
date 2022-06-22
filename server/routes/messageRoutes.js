/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getListingMessages, createMessage } = require('../../db/db');

router.post('/', async(req, res) => {
  await createMessage({...req.body});
  const getMessages = await getListingMessages(req.body.listing_id);
  res.send(getMessages);
});

router.get('/:id', async(req, res) => {
  const id = req.params.id;
  const messages = await getListingMessages(id);
  res.send(messages);
});


module.exports = router;
