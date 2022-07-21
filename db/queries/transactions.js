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
  const query =  knex('transactions')
    .select('transactions.id', 'transactions.status', 'transaction_type', 'notes', 'start_date', 'end_date', 'listing_id', 'transactions.agent_id', 'transactions.organization_id', 'transaction_value', 'market_value', 'transactions.created_at', 'transactions.updated_at')
    .from('transactions')
    .leftJoin('users', {'users.id': 'transactions.agent_id'})
    .rightJoin('listings', {'listings.id': 'transactions.listing_id'})
    .whereILike('transactions.status', `%${search}%`)
    .orWhereILike('transactions.transaction_type', `%${search}%`)
    .orWhereILike('name', `%${search}%`)
    .orWhereILike('email', `%${search}%`);

  if (search.toLowerCase().split('-')[0] === 'trx') {
    const searchId = search.split('-')[1];
    if (searchId && !isNaN(searchId)) {
      query.orWhere('transactions.id', '=', parseInt(searchId));
    }
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