import { Request, Response } from 'express';

import MatcherService from '../service/Matches.service';

class MatchController {
  private _matchService: MatcherService = new MatcherService();

  getAllMatchers = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (!inProgress) {
      const result = await this._matchService.matches();
      return res.status(200).json(result);
    }

    const validBoolean = inProgress === 'true';

    const result = await this._matchService.matchesProgress(validBoolean);

    return res.status(200).json(result);
  };

  getPatchId = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this._matchService.updateFinish(+id);

    return res.status(200).json({ message: result.message });
  };
}

export default MatchController;