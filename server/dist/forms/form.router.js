import express from 'express';
import formController from './form.controller';
const formRouter = express.Router();
import passport from 'passport';

formRouter.post('/newMasterForm', passport.authenticate('jwt', { session: false }), formController.newMasterForm);
formRouter.get('/findAllForms', passport.authenticate('jwt', { session: false }), formController.findAllForms);
formRouter.get('/findSingleForm/:id', passport.authenticate('jwt', { session: false }), formController.findSingleForm);
formRouter.delete('/deleteSingleForm/:id', passport.authenticate('jwt', { session: false }), formController.deleteSingleForm);
formRouter.put('/UpdateForm/:id', passport.authenticate('jwt', { session: false }), formController.UpdateForm);
formRouter.put('/updateFormStatus/:id', passport.authenticate('jwt', { session: false }), formController.updateFormStatus);
formRouter.post('/insertFormData', passport.authenticate('jwt', { session: false }), formController.insertFormData);
formRouter.get('/findFormData/:id', passport.authenticate('jwt', { session: false }), formController.findFormData);
formRouter.get('/findFormDataSingle/:id', passport.authenticate('jwt', { session: false }), formController.findFormDataSingle);
formRouter.delete('/deleteSingleData/:id', passport.authenticate('jwt', { session: false }), formController.deleteSingleData);
formRouter.put('/updateSingleData/:id', passport.authenticate('jwt', { session: false }), formController.updateSingleData);

export default formRouter;