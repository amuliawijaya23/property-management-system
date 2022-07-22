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
  const searchTerm = (() => {
    const term = search.trim().toLowerCase();
    const arrId = term.split('-');
    if (arrId[0] === 'task' && arrId.length === 2) {
      return arrId[1];
    }
    return term;
  })();
  const query =  knex('tasks')
    .select('tasks.id', 'tasks.summary', 'notes', 'tasks.category', 'due_date', 'tasks.listing_id', 'tasks.status', 'tasks.agent_id', 'tasks.organization_id', 'tasks.created_at', 'tasks.updated_at')
    .from('tasks')
    .leftJoin('users', {'users.id': 'tasks.agent_id'})
    .rightJoin('listings', {'listings.id': 'tasks.listing_id'})
    .whereILike('tasks.status', `%${searchTerm}%`)
    .orWhereILike('tasks.summary', `%${searchTerm}%`)
    .orWhereILike('tasks.category', `%${searchTerm}%`)
    .orWhereILike('name', `%${searchTerm}%`)
    .orWhereILike('email', `%${searchTerm}%`);

  searchTerm.split(' ').forEach((t) => {
    query.orWhereILike('tasks.summary', `%${t}%`)
      .orWhereILike('email', `%${t}%`)
      .orWhereILike('name', `%${t}%`);
  });

  if (searchTerm && !isNaN(searchTerm)) {
    query.orWhere('tasks.id', '=', parseInt(searchTerm));
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