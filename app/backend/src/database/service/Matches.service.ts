import { ModelStatic } from 'sequelize';
import MatchesModel from '../models/MatchesModel';
import Teams from '../models/Teams.model';
import IPatch from '../../Interfaces/IPatch';
import IPatchIDGoals from '../../Interfaces/IPatchIDGoals';
import ICreateMatch from '../../Interfaces/ICreateMatch';

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
    return { message: 'Atualizando os gols' };
  }

  async createMatches(newMatch: ICreateMatch): Promise<IPatch> {
    const { awayTeamId, homeTeamId } = newMatch;

    const idHomeTeamIdSearch = await this.modelTeam.findByPk(homeTeamId);

    if (!idHomeTeamIdSearch) {
      return { type: 404, message: 'There is no team with such id!' };
    }

    const awayTeamIdSeach = await this.modelTeam.findByPk(awayTeamId);

    if (!awayTeamIdSeach) {
      return { type: 404, message: 'There is no team with such id!' };
    }

    if (awayTeamId === homeTeamId) {
      return {
        type: 422,
        message: 'It is not possible to create a match with two equal teams',
      };
    }

    const creatAsMatches = await this.model.create({ ...newMatch, inProgress: true });
    return { matcheCreated: creatAsMatches };
  }
}

export default MatchesService;

/* esse update estar atualizando a tablea inprogress,
quando eu declarei la na model ja ele é uma boolean */
