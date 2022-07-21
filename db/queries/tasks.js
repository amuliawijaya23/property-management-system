/* eslint-disable camelcase */
const knex = require('../knex');

const getTasks = (org) => {
  return knex('tasks')
    .where({organization_id: org})
    .then((res) => res)
    .catch(e => console.log(e.message));
};

const addTask = (task) => {
  return knex('tasks')
    .insert({ ...task })
    .returning('*')
    .catch(e => console.log(e.message));
};

const updateTasks = (data) => {
  return knex('tasks')
    .where({ id: data.id })
    .update({...data})
    .returning('*')
    .catch((e) => console.log(e.message));
};

const getListingTasks = (id) => {
  return knex('tasks')
    .where({listing_id: id})
    .orderBy('created_at', 'desc')
    .then((res) => res)
    .catch(e => console.log(e.message));
};

const searchTasks = (search) => {
  const query =  knex('tasks')
    .select('tasks.id', 'tasks.summary', 'notes', 'tasks.category', 'due_date', 'tasks.listing_id', 'tasks.status', 'tasks.agent_id', 'tasks.organization_id', 'tasks.created_at', 'tasks.updated_at')
    .from('tasks')
    .leftJoin('users', {'users.id': 'tasks.agent_id'})
    .rightJoin('listings', {'listings.id': 'tasks.listing_id'})
    .whereILike('tasks.status', `%${search}%`)
    .orWhereILike('tasks.summary', `%${search}%`)
    .orWhereILike('tasks.category', `%${search}%`)
    .orWhereILike('name', `%${search}%`)
    .orWhereILike('email', `%${search}%`);

  if (search.toLowerCase().split('-')[0] === 'task') {
    const searchId = search.split('-')[1];
    if (searchId && !isNaN(searchId)) {
      query.orWhere('tasks.id', '=', parseInt(searchId));
    }
  }

  return query.then((res) => res)
    .catch((e) => console.log(e.message));
};

module.exports = {
  getTasks,
  updateTasks,
  getListingTasks,
  addTask,
  searchTasks
};