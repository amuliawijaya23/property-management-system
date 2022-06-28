/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('images').del()
    .then(() => {

      return knex('images').insert([
        {
          id: '41d86e82cee8f30caa398e632edee9ec',
          link: '/images/41d86e82cee8f30caa398e632edee9ec',
          listing_id: 1,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          id: '6eb4c9bf1335ef0efadee45ca1ad2ba7',
          link: '/images/6eb4c9bf1335ef0efadee45ca1ad2ba7',
          listing_id: 2,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          id: 'c80fd9f0511aec155e6d55d33ae58b60',
          link: '/images/c80fd9f0511aec155e6d55d33ae58b60',
          listing_id: 3,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          id: 'd45c7e80e0aff39d8595010929796b3b',
          link: '/images/d45c7e80e0aff39d8595010929796b3b',
          listing_id: 4,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          id: 'd4e15d6e7a78e1c5dbd66576fe266780',
          link: '/images/d4e15d6e7a78e1c5dbd66576fe266780',
          listing_id: 5,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          id: 'e4a7a29047fc79b85b8382445d6a37d5',
          link: '/images/e4a7a29047fc79b85b8382445d6a37d5',
          listing_id: 1,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          id: 'eca40c5c0657525a3687ace34b191569',
          link: '/images/eca40c5c0657525a3687ace34b191569',
          listing_id: 1,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
      ]);
    });
};