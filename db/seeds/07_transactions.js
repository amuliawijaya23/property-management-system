/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('transactions').del()
    .then(() => {

      return knex('transactions').insert([
        {
          status: 'Active',
          transaction_type: 'Income',
          service_type: 'Renting',
          notes: '24 months rent agreement',
          date_started: '2022-02-18T08:15:00',
          date_closed: '2024-02-18T08:15:00',
          listing_id: 1,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          amount: 42000
        },
        {
          status: 'Active',
          transaction_type: 'Deposit',
          service_type: 'Renting',
          notes: '24 months rent deposit',
          date_started: '2022-02-18T08:15:00',
          date_closed: '2024-02-18T08:15:00',
          listing_id: 1,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          amount: 750
        },
        {
          status: 'Closed',
          transaction_type: 'Deposit',
          service_type: 'Selling',
          notes: 'Agreement deposit',
          date_started: '2022-01-18T08:15:00',
          date_closed: '2022-02-04T08:11:40',
          listing_id: 2,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          amount: 128000
        },
        {
          status: 'Closed',
          transaction_type: 'Income',
          service_type: 'Selling',
          notes: 'transaction closed',
          date_started: '2022-01-18T08:15:00',
          date_closed: '2022-02-04T08:11:40',
          listing_id: 2,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          amount: 2875000
        }
      ]);
    });
};