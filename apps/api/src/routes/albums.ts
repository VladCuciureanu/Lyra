import { UserRole } from '@lyra/schema';
import { Router } from 'express';
import albumsController from '../controllers/albums';
import { authenticate } from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import {
  validateCreateAlbum,
  validateUpdateAlbum,
} from '../middlewares/validators';

const albumsRouter = Router();

albumsRouter
  .route('/')
  .get(albumsController.getAlbums)
  .post(
    validateCreateAlbum,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    albumsController.createAlbum
  );

albumsRouter
  .route('/:id')
  .get(albumsController.getAlbum)
  .patch(
    authenticate,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    validateUpdateAlbum,
    albumsController.updateAlbum
  )
  .delete(
    authenticate,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    albumsController.deleteAlbum
  );

export default albumsRouter;
