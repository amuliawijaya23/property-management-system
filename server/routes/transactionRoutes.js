/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getTransactions, updateTransaction, createTransactions, getListingTransactions, getCompletedTransactions, getCompletedSumCount } = require('../../db/queries/transactions');

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

router.post('/transactions/data', async(req, res) => {
  try {
    let param = {};
    Object.keys({...req.body}).slice(2).forEach((key) => {
      if (({...req.body})[key]) {
        param[key] = ({...req.body})[key];
      }
    });
    const start = req.body.start || new Date();
    const end = req.body.end || new Date();
    const result = await getCompletedSumCount(param, start, end);
    const transactions = await getCompletedTransactions(param, start, end);
    res.send({
      sum: result.sum,
      count: result.count,
      transactions: transactions
    });
  } catch (error) {
    console.error(error.response ? error.response.body : error);
  }
});

router.put('/transactions', async(req, res) => {
  const transaction = {...req.body};
  await updateTransaction(transaction);
  const result = await getTransactions(transaction.organization_id);
  res.send(result);
});

router.get('/transactions/:id', async(req, res) => {
  const id = req.params.id;
  const transactions = await getTransactions(id);
  res.send(transactions);
});


module.exports = router;
