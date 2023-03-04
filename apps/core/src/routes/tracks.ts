import { UserRole } from '@lyra/schema';
import { Router } from 'express';
import tracksController from '../controllers/tracks';
import { authenticate } from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import {
  validateCreateTrack,
  validateUpdateTrack,
} from '../middlewares/validators';

const tracksRouter = Router();

tracksRouter
  .route('/')
  .get(tracksController.getTracks)
  .post(
    validateCreateTrack,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    tracksController.createTrack
  );

tracksRouter
  .route('/:id')
  .get(tracksController.getTrack)
  .patch(
    authenticate,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    validateUpdateTrack,
    tracksController.updateTrack
  )
  .delete(
    authenticate,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    tracksController.deleteTrack
  );

export default tracksRouter;
