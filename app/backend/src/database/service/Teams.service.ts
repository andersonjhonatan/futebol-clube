import { ModelStatic } from 'sequelize';
import ModelTeams from '../models/Teams.model';
import IServiceTeam from '../../Interfaces/ITeamsService';

class TeamServices implements IServiceTeam {
  protected model: ModelStatic<ModelTeams> = ModelTeams;

  async getAllTeams(): Promise<ModelTeams[]> {
    return this.model.findAll();
  }

  async getByItemId(id: number): Promise<ModelTeams | null> {
    return this.model.findByPk(id);
  }
}
export default TeamServices;
