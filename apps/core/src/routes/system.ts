import { Router } from 'express';
import systemController from '../controllers/system';

const systemRouter = Router();

systemRouter.route('/ping').get(systemController.ping);

export default systemRouter;
