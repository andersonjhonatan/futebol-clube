import ModelTeams from '../database/models/Teams.model';

export default interface IServiceTeam {
  getAllTeams(): Promise<ModelTeams[]>;
  getByItemId(id: number): Promise<ModelTeams | null>;
}
