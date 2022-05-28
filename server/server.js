require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const App = express();
const PORT = process.env.PORT || 3001;

// Express Configuration
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
App.use(express.static(path.resolve(__dirname, '../client/build')));

// setup morgan middleware
App.use(morgan('dev'));

// Routers
const apiRoutes = require('./routes/apiRoutes');

App.use('/api', apiRoutes);

App.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


// Set up server port
App.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}!`);
});



