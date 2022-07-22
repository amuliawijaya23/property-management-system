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
  const searchTerm = (() => {
    const term = search.trim().toLowerCase();
    const arrId = term.split('-');
    if (arrId[0] === 'con' && arrId.length === 2) {
      return arrId[1];
    }
    return term;
  })();
  const query =  knex('contacts')
    .select('contacts.id', 'contacts.first_name', 'contacts.last_name', 'contacts.email', 'mobile', 'home', 'office', 'address', 'contacts.agent_id', 'contacts.organization_id', 'contacts.created_at', 'contacts.updated_at')
    .from('contacts')
    .leftJoin('users', {'users.id': 'contacts.agent_id'})
    .whereILike('contacts.first_name', `%${searchTerm}%`)
    .orWhereILike('contacts.last_name', `%${searchTerm}%`)
    .orWhereILike('contacts.email', `%${searchTerm}%`)
    .orWhereILike('contacts.address', `%${searchTerm}%`)
    .orWhereILike('users.name', `%${searchTerm}%`);

  searchTerm.split(' ').forEach((t) => {
    query.orWhereILike('contacts.first_name', `%${t}%`)
      .orWhereILike('contacts.last_name', `%${t}%`)
      .orWhereILike('contacts.email', `%${t}%`)
      .orWhereILike('contacts.address', `%${t}%`)
      .orWhereILike('users.name', `%${t}%`);
  });

  if (searchTerm && !isNaN(searchTerm)) {
    query.orWhere('contacts.id', '=', parseInt(searchTerm));
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