import { Request, Response } from 'express';
import LeaderService from '../service/Leaderboards.service';

class LeaderboardController {
  private _service: LeaderService = new LeaderService();

  getTeamsAllRank = async (_req: Request, res: Response) => {
    const result = await this._service.getLeaderAllHome();

    return res.status(200).json(result);
  };

  getLeaderAllAway = async (_req: Request, res: Response) => {
    const result = await this._service.getLeaderAllAway();

    return res.status(200).json(result);
  };

  getLeaderAll = async (_req: Request, res: Response) => {
    const result = await this._service.getLeaderAll();

    return res.status(200).json(result);
  };
}

export default LeaderboardController;
