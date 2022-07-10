/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('contacts').del()
    .then(() => {

      return knex('contacts').insert([
        {
          first_name: 'Jimmy',
          last_name: 'Bly',
          email: 'screaming7@gmail.com',
          mobile: 7604281029,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v'
        },
      ]);
    });
};