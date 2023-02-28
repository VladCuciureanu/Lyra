import { UserRole } from '@lyra/schema';
import { Router } from 'express';
import artistsController from '../controllers/artists';
import { authenticate } from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import {
  validateCreateArtist,
  validateUpdateArtist,
} from '../middlewares/validators';

const artistsRouter = Router();

artistsRouter
  .route('/')
  .get(artistsController.getArtists)
  .post(
    validateCreateArtist,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    artistsController.createArtist
  );

artistsRouter
  .route('/:id')
  .get(artistsController.getArtist)
  .patch(
    authenticate,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    validateUpdateArtist,
    artistsController.updateArtist
  )
  .delete(
    authenticate,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    artistsController.deleteArtist
  );

export default artistsRouter;
