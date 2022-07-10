/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('listing_watchers').del()
    .then(() => {

      return knex('listing_watchers').insert([
        {
          user_id: 'auth0|62badd1761165c6696257493',
          listing_id: 1
        },
      ]);
    });
};