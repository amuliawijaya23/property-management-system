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


// setup morgan middleware
App.use(morgan('dev'));

// setup cors
App.use(cors());


// Routers
const apiRoutes = require('./routes/apiRoutes');
const gpRoutes = require('./routes/gpRoutes');
const imagesRoutes = require('./routes/imagesRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

App.use('/api', apiRoutes);
App.use('/gp', gpRoutes);
App.use('/images', imagesRoutes);
App.use('/user', userRoutes);
App.use('/message', messageRoutes);


if (process.env.NODE_ENV === 'production') {
  // serve static content
  App.use(express.static(path.resolve(__dirname, '../client/build')));

  App.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Set up server port
App.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}!`);
});



