import { ModelStatic } from 'sequelize';
import { resultOrder, leaderboardResult, boardAll } from '../../utils/leaderUtils';
import Matches from '../models/MatchesModel';
import Teams from '../models/Teams.model';
import Ileader from '../../Interfaces/ILearboard';

class LeaderboardService {
  protected modelMatches: ModelStatic<Matches> = Matches;
  protected modelTeams: ModelStatic<Teams> = Teams;

  async getLeaderAllHome(): Promise<Ileader[]> {
    const resultTeams = await this.modelTeams.findAll();
    const resultMatches = await this.modelMatches.findAll({
      where: { inProgress: false },
    });
    const result: Ileader[] = [];
    resultTeams.forEach((teams) => {
      const matcheResult = resultMatches.filter(
        (matches) => matches.homeTeamId === teams.id,
      );
      result.push(
        leaderboardResult(teams.teamName, matcheResult, [
          'homeTeamGoals',
          'awayTeamGoals',
        ]),
      );
    });

    return resultOrder(result);
  }

  async getLeaderAllAway(): Promise<Ileader[]> {
    const resultTeams = await this.modelTeams.findAll();
    const resultMatches = await this.modelMatches.findAll({
      where: { inProgress: false },
    });
    const result: Ileader[] = [];
    resultTeams.forEach((teams) => {
      const resultMatche = resultMatches.filter(
        (matche) => matche.awayTeamId === teams.id,
      );
      result.push(
        leaderboardResult(teams.teamName, resultMatche, [
          'awayTeamGoals',
          'homeTeamGoals',
        ]),
      );
    });

    return resultOrder(result);
  }

  async getLeaderAll(): Promise<Ileader[]> {
    const resultTeams = await this.modelTeams.findAll();
    const resultMatches = await this.modelMatches.findAll({
      where: { inProgress: false },
    });
    const result: Ileader[] = [];
    resultTeams.forEach((teams) => {
      const home = resultMatches.filter((matche) => matche.homeTeamId === teams.id);
      const away = resultMatches.filter((matche) => matche.awayTeamId === teams.id);
      result.push(boardAll(teams.teamName, home, away));
    });

    return resultOrder(result);
  }
}

export default LeaderboardService;
