import { Router } from 'express';
import LeaderboardController from '../controller/Leadboard.controller';

const leaderboardRoutes = Router();

const controller = new LeaderboardController();

leaderboardRoutes.get('/leaderboard', controller.getLeaderAll);
leaderboardRoutes.get('/leaderboard/home', controller.getTeamsAllRank);
leaderboardRoutes.get('/leaderboard/away', controller.getLeaderAllAway);

export default leaderboardRoutes;
