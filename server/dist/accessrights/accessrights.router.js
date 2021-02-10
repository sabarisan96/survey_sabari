import express from 'express';
import accessRightsController from './accessrights.controller';
const accessRouter = express.Router();
import passport from 'passport';

accessRouter.get('/findAccessRightsBasedOnId/:id', passport.authenticate('jwt', { session: false }), accessRightsController.findAccessRightsBasedOnId);

accessRouter.post('/addAccessRights', passport.authenticate('jwt', { session: false }), accessRightsController.addAccessRights);

accessRouter.put('/updateAccessRights/:id', passport.authenticate('jwt', { session: false }), accessRightsController.updateAccessRights);

export default accessRouter;