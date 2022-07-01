/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('tasks').del()
    .then(() => {

      return knex('tasks').insert([
        {
          summary: 'Pakuan Indah Apartment - Open House',
          notes: 'Property will require cleaning before showing.',
          category: 'Open House',
          due_date: '2022-08-18T08:15:00',
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v'
        },
      ]);
    });
};