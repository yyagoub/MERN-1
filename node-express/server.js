const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();

// intialize the project
const app = express();

// interceptor: to enable cors
app.use(cors());

// interceptor: to convert every request.body to JSON object
app.use(express.json());

// db connection
require('./config/database');

// routes
app.use(require('./controllers/controllers'));

// Server listens on http://localhost:5000
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
