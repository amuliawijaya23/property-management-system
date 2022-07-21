/* eslint-disable camelcase */
const knex = require('../knex');

const getContacts = (org) => {
  return knex('contacts')
    .where({organization_id: org})
    .then((res) => res)
    .catch(e => console.log(e.message));
};

const createContact = (contact) => {
  return knex('contacts')
    .insert({ ...contact })
    .returning('*')
    .catch((e) => console.log(e.message));
};

const updateContacts = (data) => {
  return knex('contacts')
    .where({ id: data.id })
    .update({...data})
    .returning('*')
    .catch((e) => console.log(e.message));
};

const searchContacts = (search) => {
  const query =  knex('contacts')
    .select('contacts.id', 'contacts.first_name', 'contacts.last_name', 'contacts.email', 'mobile', 'home', 'office', 'address', 'contacts.agent_id', 'contacts.organization_id', 'contacts.created_at', 'contacts.updated_at')
    .from('contacts')
    .leftJoin('users', {'users.id': 'contacts.agent_id'})
    .whereILike('contacts.first_name', `%${search}%`)
    .orWhereILike('contacts.last_name', `%${search}%`)
    .orWhereILike('contacts.email', `%${search}%`)
    .orWhereILike('contacts.address', `%${search}%`)
    .orWhereILike('users.name', `%${search}%`)
    .orWhereILike('contacts.email', `%${search}%`);

  if (search.toLowerCase().split('-')[0] === 'con') {
    const searchId = search.split('-')[1];
    if (searchId && !isNaN(searchId)) {
      query.orWhere('contacts.id', '=', parseInt(searchId));
    }
  }

  return query.then((res) => res)
    .catch((e) => console.log(e.message));
};

module.exports = {
  getContacts,
  updateContacts,
  createContact,
  searchContacts
};