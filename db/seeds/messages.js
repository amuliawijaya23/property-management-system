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
        },
        {
          message: 'Property ready for showings.',
          listing_id: 1,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          sender_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          message: 'Waiting for both parties to reach an agreement.',
          listing_id: 2,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          sender_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          message: 'This listing has been canceled. closing out.',
          listing_id: 5,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          sender_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          message: 'Still waiting for client to make decision, currently considering 3 out of 10 properties inquired',
          listing_id: 4,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          sender_id: 'auth0|62a915d40fb854efec56620b'
        },{
          message: 'Owner has verbally accepted offer, will follow up after completion.',
          listing_id: 2,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          sender_id: 'auth0|62a915d40fb854efec56620b'
        },{
          message: 'Received 10 offers so far, expecting more to come in the following week.',
          listing_id: 3,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          sender_id: 'auth0|62a915d40fb854efec56620b'
        },
      ]);
    });
};