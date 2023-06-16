import { ModelStatic } from 'sequelize';
import MatchesModel from '../models/MatchesModel';
import Teams from '../models/Teams.model';

class MatchesService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;
  protected modelTeam: ModelStatic<Teams> = Teams;

  async matches(): Promise<MatchesModel[]> {
    return this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam' },
        { model: Teams, as: 'awayTeam' },
      ],
    });
  }

  async matchesProgress(inProgress: boolean): Promise<MatchesModel[]> {
    return this.model.findAll(
      {
        where: { inProgress },
        include: [
          { model: Teams, as: 'homeTeam' },
          { model: Teams, as: 'awayTeam' },
        ],
      },
    );
  }
}

export default MatchesService;
