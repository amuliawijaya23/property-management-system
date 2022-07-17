/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getTransactions, updateTransaction, createTransactions, getListingTransactions } = require('../../db/db');

router.get('/transactions/listing/:id', async(req, res) => {
  const id = req.params.id;
  const transactions = await getListingTransactions(id);
  res.send(transactions);
});

router.post('/transactions', async(req, res) => {
  const transaction = {...req.body};
  await createTransactions(transaction);
  const result = await getTransactions(transaction.organization_id);
  res.send(result);
});

router.get('/transactions/:id', async(req, res) => {
  const id = req.params.id;
  const transactions = await getTransactions(id);
  res.send(transactions);
});

router.put('/transactions', async(req, res) => {
  const transaction = {...req.body};
  await updateTransaction(transaction);
  const result = await getTransactions(transaction.organization_id);
  res.send(result);
});


module.exports = router;
