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
          start_date: '2022-02-18T08:15:00',
          end_date: '2024-02-18T08:15:00',
          listing_id: 1,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 42000
        },
        {
          status: 'Active',
          transaction_type: 'Deposit',
          service_type: 'Renting',
          notes: '24 months rent deposit',
          start_date: '2022-02-18T08:15:00',
          end_date: '2024-02-18T08:15:00',
          listing_id: 1,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 750
        },
        {
          status: 'Closed',
          transaction_type: 'Deposit',
          service_type: 'Selling',
          notes: 'Agreement deposit',
          start_date: '2022-01-18T08:15:00',
          end_date: '2022-02-04T08:11:40',
          listing_id: 2,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 128000
        },
        {
          status: 'Closed',
          transaction_type: 'Income',
          service_type: 'Selling',
          notes: 'transaction closed',
          start_date: '2022-01-18T08:15:00',
          end_date: '2022-02-04T08:11:40',
          listing_id: 2,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 2875000
        }
      ]);
    });
};