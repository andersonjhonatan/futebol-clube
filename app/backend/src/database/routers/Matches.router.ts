import { Router } from 'express';

import MatchController from '../controller/Matchers.controller';

const matchRouter = Router();

const newController = new MatchController();

matchRouter.get('/matches', newController.getAllMatchers);

export default matchRouter;
