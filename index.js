// importing required modules
const express = require('express');
const upload = require('express-fileupload');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./db/connect');
require('dotenv').config();
const expressSession = require('express-session');

const app = express();

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// file upload
app.use(upload());

//---------Express Session----------//
app.use(
  expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// setting routes
const csvroute = require('./routes/csvroute');
app.use('/', csvroute);

// connecting to local database
const dbUrl = process.env.MONGO_URL;
connectDB(dbUrl);

// port number
const port = process.env.PORT || 4040;

// running on port
app.listen(port, () => { console.log(`Server is running on port: ${port}...`) });