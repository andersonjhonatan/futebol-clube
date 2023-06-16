import { Router } from 'express';
import TokenVerify from '../middleware/Token.middlewares';

import MatchController from '../controller/Matchers.controller';

const matchRouter = Router();

const newController = new MatchController();

matchRouter.get('/matches', newController.getAllMatchers);
matchRouter.patch('/matches/:id/finish', TokenVerify, newController.getPatchId);

export default matchRouter;
