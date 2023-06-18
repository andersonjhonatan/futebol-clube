import { Request, Response } from 'express';
import IServiceTeam from '../../Interfaces/ITeamsService';

class TeamsControllers {
  private _service: IServiceTeam;

  constructor(serviceTeams: IServiceTeam) {
    this._service = serviceTeams;
  }

  public getTeamAll = async (_req: Request, res: Response) => {
    const resultAll = await this._service.getAllTeams();
    res.status(200).json(resultAll);
  };

  public getByTeam = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this._service.getByItemId(+id);

    res.status(200).json(result);
  };
}

export default TeamsControllers;
