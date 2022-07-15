/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { getTransactions, updateTransaction } = require('../../db/db');

// router.get('/tasks/:id', async(req, res) => {
//   const id = req.params.id;
//   const tasks = await getTasks(id);
//   res.send(tasks);
// });

// router.get('/tasks/listing/:id', async(req, res) => {
//   const id = req.params.id;
//   const tasks = await getListingTasks(id);
//   res.send(tasks);
// });

// router.put('/tasks', async(req, res) => {
//   const update = {...req.body};
//   const result = await updateTasks(update);
//   res.send(result);
// });

// router.post('/tasks', async(req, res) => {
//   const task = {...req.body};
//   await addTask(task);
//   const result = await getTasks(task.organization_id);
//   res.send(result);
// });

router.get('/transactions/:id', async(req, res) => {
  const id = req.params.id;
  const transactions = await getTransactions(id);
  res.send(transactions);
});

router.put('/transactions', async(req, res) => {
  const transaction = {...req.body};
  await updateTransaction(transaction);
  const result = await getTransactions(req.body.organization_id);
  res.send(result);
});


module.exports = router;
