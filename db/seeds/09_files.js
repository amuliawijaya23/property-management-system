/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('files').del()
    .then(() => {

      return knex('files').insert([
        {
          id: '7acd5f4a9263aba0f69ccf6576077fbf',
          link: '/files/7acd5f4a9263aba0f69ccf6576077fbf',
          listing_id: 1,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          agent_id: 'auth0|62a915d40fb854efec56620b'
        },
      ]);
    });
};