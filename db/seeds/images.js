/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('images').del()
    .then(() => {

      return knex('images').insert([
      ]);
    });
};