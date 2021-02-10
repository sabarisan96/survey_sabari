const express = require('express');
const accessRightsController = require('./accessrights.controller');
const accessRouter = express.Router();
const passport = require('passport');

accessRouter.get('/findAccessRightsBasedOnId/:id', passport.authenticate('jwt', { session: false }), accessRightsController.findAccessRightsBasedOnId);

accessRouter.post('/addAccessRights', passport.authenticate('jwt', { session: false }), accessRightsController.addAccessRights);

accessRouter.put('/updateAccessRights/:id', passport.authenticate('jwt', { session: false }), accessRightsController.updateAccessRights);

module.exports = accessRouter;
