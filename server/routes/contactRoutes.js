/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getContacts, updateContacts, createContact, searchContacts } = require('../../db/queries/contacts');

router.get('/contacts/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const contacts = await getContacts(id);
    res.send(contacts);
  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});


router.put('/contacts', async(req, res) => {
  try {
    await updateContacts({ ...req.body });
    const contacts = await getContacts(req.body.organization_id);
    res.send(contacts);
  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});

router.post('/contacts', async(req, res) => {
  try {
    await createContact({ ...req.body });
    const contacts = await getContacts(req.body.organization_id);
    res.send(contacts);
  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});


router.post('/contacts/search', async(req, res) => {
  try {
    const search = req.body.search;
    const result = await searchContacts(search);
    res.send(result);
  } catch (error) {
    console.error(error.response ? error.response.body : error);
  }
});

module.exports = router;
