/* eslint-disable camelcase */
require('dotenv').config({path: '../.env'});
const express = require('express');
const router = express.Router();

const { updateTasks, getTasks, addTask, getListingTasks } = require('../../db/db');

router.get('/tasks/:id', async(req, res) => {
  const id = req.params.id;
  const tasks = await getTasks(id);
  res.send(tasks);
});

router.get('/tasks/listing/:id', async(req, res) => {
  const id = req.params.id;
  const tasks = await getListingTasks(id);
  res.send(tasks);
});

router.put('/tasks', async(req, res) => {
  const update = {...req.body};
  await updateTasks(update);
  const result = await getTasks(update.organization_id);
  res.send(result);
});

router.post('/tasks', async(req, res) => {
  const task = {...req.body};
  await addTask(task);
  const result = await getTasks(task.organization_id);
  res.send(result);
});


module.exports = router;
