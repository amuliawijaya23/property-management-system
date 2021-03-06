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
const transactionRoutes = require('./routes/transactionRoutes');
const propertiesRoutes = require('./routes/propertiesRoutes');
const gpRoutes = require('./routes/gpRoutes');
const imagesRoutes = require('./routes/imagesRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const sgRoutes = require('./routes/sgRoutes');
const contactRoutes = require('./routes/contactRoutes');
const taskRoutes = require('./routes/taskRoutes');
const fileRoutes = require('./routes/fileRoutes');

App.use('/api', transactionRoutes);
App.use('/api', propertiesRoutes);
App.use('/api', contactRoutes);
App.use('/api', taskRoutes);
App.use('/gp', gpRoutes);
App.use('/images', imagesRoutes);
App.use('/user', userRoutes);
App.use('/message', messageRoutes);
App.use('/sg', sgRoutes);
App.use('/files', fileRoutes);


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



