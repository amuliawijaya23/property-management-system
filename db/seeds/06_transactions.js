/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('transactions').del()
    .then(() => {

      return knex('transactions').insert([
        {
          status: 'Open',
          transaction_type: 'Lease',
          notes: '24 months rent agreement',
          start_date: '2022-02-18T08:15:00',
          end_date: '2024-02-18T08:15:00',
          listing_id: 1,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 55000000
        },
        {
          status: 'Open',
          transaction_type: 'Deposit',
          notes: '24 months rent deposit',
          start_date: '2022-02-18T08:15:00',
          end_date: '2024-02-18T08:15:00',
          listing_id: 1,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 2500000
        },
        {
          status: 'Pending Confirmation',
          transaction_type: 'Deposit',
          notes: 'Agreement deposit',
          start_date: '2022-01-18T08:20:00',
          end_date: '2022-02-27T08:20:00',
          listing_id: 2,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 10000000
        },
        {
          status: 'Open',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2022-02-12T08:20:00',
          end_date: '2022-02-18T08:20:00',
          listing_id: 2,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 220000000
        },

        {
          status: 'Pending Confirmation',
          transaction_type: 'Sale',
          notes: 'waiting confirmation',
          start_date: '2022-02-15T08:20:00',
          end_date: '2022-03-07T08:20:00',
          listing_id: 10,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 160000000
        },
        {
          status: 'Completed',
          transaction_type: 'Deposit',
          notes: 'transaction closed',
          start_date: '2022-03-12T08:20:00',
          end_date: '2022-03-28T08:20:00',
          listing_id: 10,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 28750000
        },
        {
          status: 'Open',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2022-03-24T08:20:00',
          end_date: '2022-03-30T08:20:00',
          listing_id: 3,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 380000000
        }
      ]);
    });
};