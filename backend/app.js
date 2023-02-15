// === IMPORT PACKAGES ===
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');



// === ENVIRONMENT === (isProduction true/false)
const { environment } = require('./config');
const isProduction = environment === 'production';

// === INITIALIZE EXPRESS APPLICATION ===
const app = express();

// === MIDDLEWARE ===

// logging information about requests and responses
app.use(morgan('dev'));

// cookie parsing
app.use(cookieParser());
// parses JSON bodies of requests with "Content-Type" of "application/json"
app.use(express.json());

// Security Middleware

if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

const routes = require('./routes');

// ...

app.use(routes); // Connect all the routes

module.exports = app;
