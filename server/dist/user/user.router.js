import express from 'express';
import userController from './user.controller';
import passport from 'passport';

export const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/test', passport.authenticate('jwt', { session: false }), userController.test);
userRouter.get('/userlist', passport.authenticate('jwt', { session: false }), userController.userlist);
userRouter.post('/adduser', passport.authenticate('jwt', { session: false }), userController.signup);
userRouter.get('/findAllUsers', passport.authenticate('jwt', { session: false }), userController.findAllUsers);