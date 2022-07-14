/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getContacts, updateContacts, createContact } = require('../../db/db');

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
    console.log({...req.body});
    await createContact({ ...req.body });
    const contacts = await getContacts(req.body.organization_id);
    res.send(contacts);
  } catch (error) {
    error.response ? console.error(error.response.body) : console.error(error);
  }
});

module.exports = router;
