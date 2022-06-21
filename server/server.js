require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const App = express();
const PORT = process.env.PORT || 3001;

// Express Configuration
App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());

App.use(express.static(path.resolve(__dirname, '../client/build')));

// setup morgan middleware
App.use(morgan('dev'));

// setup cors
App.use(cors());

// Routers
const imagesRoutes = require('./routes/imagesRoutes');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

App.use('/images', imagesRoutes);
App.use('/api', apiRoutes);
App.use('/user', userRoutes);
App.use('/message', messageRoutes);

App.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Set up server port
App.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}!`);
});



