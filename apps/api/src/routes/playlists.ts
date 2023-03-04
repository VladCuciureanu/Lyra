import { UserRole } from '@lyra/schema';
import { Router } from 'express';
import playlistsController from '../controllers/playlists';
import { authenticate } from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import {
  validateCreatePlaylist,
  validateUpdatePlaylist,
} from '../middlewares/validators';

const playlistsRouter = Router();

playlistsRouter
  .route('/')
  .get(playlistsController.getPlaylists)
  .post(
    validateCreatePlaylist,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    playlistsController.createPlaylist
  );

playlistsRouter
  .route('/:id')
  .get(playlistsController.getPlaylist)
  .patch(
    authenticate,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    validateUpdatePlaylist,
    playlistsController.updatePlaylist
  )
  .delete(
    authenticate,
    authorize([UserRole.MODERATOR, UserRole.ADMIN]),
    playlistsController.deletePlaylist
  );

export default playlistsRouter;
