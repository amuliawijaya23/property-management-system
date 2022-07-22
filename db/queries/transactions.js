/* eslint-disable camelcase */
const knex = require('../knex');


// GET TRANSACTIONS DATA

const getTransactions = (id) => {
  return knex('transactions')
    .where({organization_id: id})
    .then((res) => res)
    .catch(e => console.log(e.message));
};

// Create Transaction
const createTransactions = (transaction) => {
  return knex('transactions')
    .insert({ ...transaction })
    .returning('*')
    .catch((e) => console.log(e.message));
};

// Get transactions by listing id

const getListingTransactions = (id) => {
  return knex('transactions')
    .where({listing_id: id})
    .then((res) => res)
    .catch((e) => console.log(e.message));
};

// update given transaction

const updateTransaction = (transaction) => {
  return knex('transactions')
    .where({id: transaction.id})
    .update({...transaction})
    .returning('*')
    .catch((e) => console.log(e.message));
};

const getCompletedSumCount = (param, start, end) => {
  return knex('transactions')
    .sum('transaction_value')
    .count('transaction_value')
    .whereNot({ transaction_type: 'Deposit' })
    .where({...param })
    .where('start_date', '>=', start)
    .where('start_date', '<=', end)
    .then((res) => res[0]);
};

const getCompletedTransactions = (param, start, end) => {
  return knex('transactions')
    .whereNot({ transaction_type: 'Deposit' })
    .where({...param })
    .where('start_date', '>=', start)
    .where('start_date', '<=', end)
    .then((res) => res);
};

const searchTransactions = (search) => {
  const searchTerm = (() => {
    const term = search.trim().toLowerCase();
    const arrId = term.split('-');
    if (arrId[0] === 'task' && arrId.length === 2) {
      return arrId[1];
    }
    return term;
  })();
  const query =  knex('transactions')
    .select('transactions.id', 'transactions.status', 'transaction_type', 'notes', 'start_date', 'end_date', 'listing_id', 'transactions.agent_id', 'transactions.organization_id', 'transaction_value', 'market_value', 'transactions.created_at', 'transactions.updated_at')
    .from('transactions')
    .leftJoin('users', {'users.id': 'transactions.agent_id'})
    .rightJoin('listings', {'listings.id': 'transactions.listing_id'})
    .whereILike('transactions.status', `%${searchTerm}%`)
    .orWhereILike('transactions.transaction_type', `%${searchTerm}%`)
    .orWhereILike('name', `%${searchTerm}%`)
    .orWhereILike('email', `%${searchTerm}%`);

  searchTerm.split(' ').forEach((t) => {
    query.orWhereILike('name', `%${t}%`)
      .orWhereILike('email', `%${t}%`);
  });

  if (searchTerm && !isNaN(searchTerm)) {
    query.orWhere('transactions.id', '=', parseInt(searchTerm));
  }

  return query.then((res) => res)
    .catch((e) => console.log(e.message));
};

module.exports =  {
  getTransactions,
  createTransactions,
  updateTransaction,
  getListingTransactions,
  getCompletedTransactions,
  getCompletedSumCount,
  searchTransactions
};