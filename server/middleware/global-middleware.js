const express = require('express');
const app = express();
const morgan = require('morgan');
// const { devConfig } = require('./env/development');
const cors = require('cors');
const passport = require('passport');
const configureJWTStrategy = require('./passport-jwt');

module.exports = setGlobalMiddleware = app => {
    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(passport.initialize());
    configureJWTStrategy();
};