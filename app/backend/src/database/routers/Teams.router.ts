import * as express from 'express';
import { getAllTeamController, getByIdController } from '../controller/Teams.controller';

const { Router } = express;

const teamsRouter = Router();

teamsRouter.get('/teams', getAllTeamController);
teamsRouter.get('/teams/:id', getByIdController);

export default teamsRouter;
