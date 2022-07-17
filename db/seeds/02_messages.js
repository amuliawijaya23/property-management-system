/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('messages').del()
    .then(() => {

      return knex('messages').insert([
        {
          message: 'Ready for onboarding!',
          listing_id: 1,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          sender_id: 'auth0|62a915d40fb854efec56620b'
        }
      ]);
    });
};