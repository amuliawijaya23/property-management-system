require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');

const App = express();
const PORT = process.env.PORT;

// Express Configuration
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
App.use(express.static('public'));

// setup morgan middleware
App.use(morgan('dev'));

App.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});

// Set up server port
App.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}!`);
});



