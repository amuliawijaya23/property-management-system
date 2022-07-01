/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { updateTasks, getTasks } = require('../../db/db');

router.get('/tasks/:id', async(req, res) => {
  const id = req.params.id;
  const tasks = await getTasks(id);
  res.send(tasks);
});

router.put('/tasks', async(req, res) => {
  const update = {...req.body};
  const result = await updateTasks(update);
  res.send(result);
});


module.exports = router;
