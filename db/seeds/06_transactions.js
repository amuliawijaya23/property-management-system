/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('transactions').del()
    .then(() => {

      return knex('transactions').insert([
        {
          status: 'Closed',
          transaction_type: 'Lease',
          notes: '24 months rent agreement',
          start_date: '2021-02-18T08:15:00',
          end_date: '2021-02-18T08:15:00',
          listing_id: 1,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 55000000
        },
        {
          status: 'Closed',
          transaction_type: 'Deposit',
          notes: '24 months rent deposit',
          start_date: '2021-01-18T08:15:00',
          end_date: '2021-02-18T08:15:00',
          listing_id: 1,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 2500000
        },
        {
          status: 'Closed',
          transaction_type: 'Deposit',
          notes: 'Agreement deposit',
          start_date: '2021-01-18T08:20:00',
          end_date: '2021-02-27T08:20:00',
          listing_id: 2,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 10000000
        },
        {
          status: 'Closed',
          transaction_type: 'Lease',
          notes: 'Sale Agreement',
          start_date: '2021-02-18T08:15:00',
          end_date: '2021-06-18T08:15:00',
          listing_id: 3,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 80000000
        },
        {
          status: 'Closed',
          transaction_type: 'Lease',
          notes: 'transaction started',
          start_date: '2021-04-24T08:20:00',
          end_date: '2021-04-20T08:20:00',
          listing_id: 4,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 23000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2021-03-24T08:20:00',
          end_date: '2021-03-30T08:20:00',
          listing_id: 5,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 380000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2021-02-24T08:20:00',
          end_date: '2021-03-10T08:20:00',
          listing_id: 6,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 390000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2021-03-18T08:15:00',
          end_date: '2021-12-18T08:15:00',
          listing_id: 7,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 520000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2021-04-12T08:20:00',
          end_date: '2021-02-18T08:20:00',
          listing_id: 8,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 220000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2021-05-18T08:15:00',
          end_date: '2021-12-18T08:15:00',
          listing_id: 9,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 327000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'waiting confirmation',
          start_date: '2021-06-15T08:20:00',
          end_date: '2021-03-07T08:20:00',
          listing_id: 10,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 167000000
        },
        {
          status: 'Closed',
          transaction_type: 'Deposit',
          notes: 'transaction closed',
          start_date: '2021-07-12T08:20:00',
          end_date: '2021-03-28T08:20:00',
          listing_id: 10,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 274000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2021-05-18T08:15:00',
          end_date: '2021-08-18T08:15:00',
          listing_id: 11,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 39000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2021-06-18T08:15:00',
          end_date: '2021-11-18T08:15:00',
          listing_id: 12,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 240000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2021-07-18T08:15:00',
          end_date: '2021-12-18T08:15:00',
          listing_id: 13,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 740000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2021-08-18T08:15:00',
          end_date: '2021-09-18T08:15:00',
          listing_id: 14,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 842000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2021-10-18T08:15:00',
          end_date: '2021-11-18T08:15:00',
          listing_id: 15,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 320000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2022-01-24T08:20:00',
          end_date: '2022-03-30T08:20:00',
          listing_id: 16,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 240000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2022-03-24T08:20:00',
          end_date: '2022-03-30T08:20:00',
          listing_id: 17,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 340000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2022-02-24T08:20:00',
          end_date: '2022-03-10T08:20:00',
          listing_id: 18,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 250000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2022-03-18T08:15:00',
          end_date: '2022-12-18T08:15:00',
          listing_id: 19,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 680000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'transaction started',
          start_date: '2022-04-12T08:20:00',
          end_date: '2022-02-18T08:20:00',
          listing_id: 20,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 340000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: '24 months rent agreement',
          start_date: '2022-05-18T08:15:00',
          end_date: '2022-12-18T08:15:00',
          listing_id: 21,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 245000000
        },
        {
          status: 'Closed',
          transaction_type: 'Sale',
          notes: 'waiting confirmation',
          start_date: '2022-06-15T08:20:00',
          end_date: '2022-03-07T08:20:00',
          listing_id: 22,
          agent_id: 'auth0|62a915d40fb854efec56620b',
          organization_id: 'org_SdeKNTPqOTyZc27v',
          transaction_value: 1470000000
        },
      ]);
    });
};