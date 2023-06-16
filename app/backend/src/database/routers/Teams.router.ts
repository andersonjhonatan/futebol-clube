import { Request, Response, Router } from 'express';
import ServiceTeams from '../service/Teams.service';
import ServiceController from '../controller/Teams.controller';

const teamsRouter = Router();
const serviceTeam = new ServiceTeams();
const teamControl = new ServiceController(serviceTeam);

teamsRouter.get('/teams/:id', (req: Request, res: Response) => teamControl.getByTeam(req, res));
teamsRouter.get('/teams', (req: Request, res: Response) => teamControl.getTeamAll(req, res));

export default teamsRouter;
