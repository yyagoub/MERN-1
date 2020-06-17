const mongoose = require('mongoose');

require('dotenv').config();

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.
 * To implement this, place the following string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */

// find db connection
const url =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URL_PRD
    : process.env.MONGODB_URL_DEV;

// connect to db
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// inform us if the connection established successfully
mongoose.connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});
