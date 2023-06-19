import { Router } from 'express';
import tokenVerify from '../middleware/Token.middlewares';

import MatchController from '../controller/Matchers.controller';

const matchRouter = Router();

const newController = new MatchController();

matchRouter.get('/matches', newController.getAllMatchers);
matchRouter.patch('/matches/:id/finish', tokenVerify, newController.getPatchId);
matchRouter.patch('/matches/:id', tokenVerify, newController.patchIdUpdate);
matchRouter.post('/matches', tokenVerify, newController.createdMatch);

export default matchRouter;
