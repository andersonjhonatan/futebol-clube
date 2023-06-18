import { ModelStatic } from 'sequelize';
import MatchesModel from '../models/MatchesModel';
import Teams from '../models/Teams.model';
import IPatch from '../../Interfaces/IPatch';
import IPatchIDGoals from '../../Interfaces/IPatchIDGoals';

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
    return this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam' },
        { model: Teams, as: 'awayTeam' },
      ],
    });
  }

  async updateFinish(id: number): Promise<IPatch> {
    this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  async updateID(goals: IPatchIDGoals, id: number): Promise<IPatch> {
    await this.model.update(goals, { where: { id } });
    return { message: 'updated goals' };
  }
}

export default MatchesService;

/* esse update estar atualizando a tablea inprogress,
quando eu declarei la na model ja ele é uma boolean */
