require('dotenv').config({ path: '../../.env' });
const {v4: uuidv4} = require('uuid');

const bcrypt = require('bcrypt');

const firstID = uuidv4();
const firstUserEmail = bcrypt.hashSync(process.env.FIRST_USER_EMAIL, 10);
const firstHashPass = bcrypt.hashSync(process.env.FIRST_USER_PASS, 10);

const secondId = uuidv4();
const secondUserEmail = bcrypt.hashSync(process.env.SECOND_USER_EMAIL, 10);
const secondUserPass = bcrypt.hashSync(process.env.SECOND_USER_PASS, 10);

exports.seed = async function(knex) {
  // delete existing entries
  return knex('users').del()
    .then(() => {
      // insert new seeds
      return knex('users').insert([
        {
          id: firstID,
          first_name: 'Aldino Alkuin',
          last_name: 'Muliawijaya',
          email: firstUserEmail,
          password_hash: firstHashPass,
          address: process.env.USER_ADDRESS,
          city: process.env.USER_CITY,
          postal_code: process.env.USER_POSTAL_CODE,
          country: process.env.USER_COUNTRY,
          admin: true
        },
        {
          id: secondId,
          first_name: 'Marissa',
          last_name: 'Muliawijaya',
          email: secondUserEmail,
          password_hash: secondUserPass,
          address: process.env.USER_ADDRESS,
          city: process.env.USER_CITY,
          postal_code: process.env.USER_POSTAL_CODE,
          country: process.env.USER_COUNTRY,
          admin: true
        }
      ]);
    });
};