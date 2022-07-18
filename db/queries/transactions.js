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

module.exports =  {
  getTransactions,
  createTransactions,
  updateTransaction,
  getListingTransactions,
  getCompletedTransactions,
  getCompletedSumCount
};