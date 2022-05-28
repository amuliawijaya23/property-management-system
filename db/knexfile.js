require('dotenv').config({path: '../.env'});

// set up Knex js database config

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DATABASE_URL,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    },
  }
};
