import express from 'express';
const app = express();
import morgan from 'morgan';
// import { devConfig } from './env/development';
import cors from 'cors';
import passport from 'passport';
import { configureJWTStrategy } from './passport-jwt';

export const setGlobalMiddleware = app => {
    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(passport.initialize());
    configureJWTStrategy();
};