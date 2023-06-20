import Ileader from '../Interfaces/ILearboard';
import Matches from '../database/models/MatchesModel';

type goalsTeams = 'homeTeamGoals' | 'awayTeamGoals';

const goalsArrTeam1: goalsTeams[] = ['homeTeamGoals', 'awayTeamGoals'];
const goalsArrTeam2: goalsTeams[] = ['awayTeamGoals', 'homeTeamGoals'];

export const goalsCon = (matche: Matches[], goals: goalsTeams) =>
  matche.reduce((acc, curr) => acc + curr[goals], 0);

export const vicDerEmp = (matche: Matches[], goals: goalsTeams[]) => {
  let victories = 0;
  let losses = 0;
  let draws = 0;

  matche.forEach((item) => {
    if (item[goals[0]] === item[goals[1]]) draws += 1;
    if (item[goals[0]] > item[goals[1]]) victories += 1;
    if (item[goals[0]] < item[goals[1]]) losses += 1;
  });

  return { victories, losses, draws };
};

export const pointsTotalM = (matche: Matches[], goals: goalsTeams[]): number => {
  const result = vicDerEmp(matche, goals);
  return (result.victories * 3) + result.draws;
};

export const goalsBalanceCouter = (matche: Matches[], goals: goalsTeams[]): number =>
  goalsCon(matche, goals[0]) - goalsCon(matche, goals[1]);

export const efficiency = (matche: Matches[], goals: goalsTeams[]): string => {
  const points = pointsTotalM(matche, goals);
  const jogo = matche.length;
  const result = (points / (jogo * 3)) * 100;
  return result.toFixed(2);
};

export const efficienAll = (home: Matches[], away: Matches[]): string => {
  const point = pointsTotalM(home, goalsArrTeam1) + pointsTotalM(away, goalsArrTeam2);
  const games = home.length + away.length;
  const result = (point / (games * 3)) * 100;
  return result.toFixed(2);
};

export const leaderboardResult = (nameTeam: string, matche: Matches[], goals: goalsTeams[]) => ({
  name: nameTeam,
  totalPoints: pointsTotalM(matche, goals),
  totalGames: matche.length,
  totalVictories: vicDerEmp(matche, goals).victories,
  totalDraws: vicDerEmp(matche, goals).draws,
  totalLosses: vicDerEmp(matche, goals).losses,
  goalsFavor: goalsCon(matche, goals[0]),
  goalsOwn: goalsCon(matche, goals[1]),
  goalsBalance: goalsBalanceCouter(matche, goals),
  efficiency: efficiency(matche, goals),
});

export const boardAll = (nameTeam: string, matcheHome: Matches[], matcheAway: Matches[]) => ({
  name: nameTeam,
  totalPoints: pointsTotalM(matcheHome, goalsArrTeam1) + pointsTotalM(matcheAway, goalsArrTeam2),
  totalGames: matcheHome.length + matcheAway.length,
  totalVictories: (vicDerEmp(matcheHome, goalsArrTeam1).victories
    + vicDerEmp(matcheAway, goalsArrTeam2).victories),
  totalDraws: (vicDerEmp(matcheHome, goalsArrTeam1).draws
    + vicDerEmp(matcheAway, goalsArrTeam2).draws),
  totalLosses: (vicDerEmp(matcheHome, goalsArrTeam1).losses
    + vicDerEmp(matcheAway, goalsArrTeam2).losses),
  goalsFavor: goalsCon(matcheHome, goalsArrTeam1[0]) + goalsCon(matcheAway, goalsArrTeam1[1]),
  goalsOwn: goalsCon(matcheHome, goalsArrTeam1[1]) + goalsCon(matcheAway, goalsArrTeam1[0]),
  goalsBalance: goalsBalanceCouter(matcheHome, goalsArrTeam1)
    + goalsBalanceCouter(matcheAway, goalsArrTeam2),
  efficiency: efficienAll(matcheHome, matcheAway),
});

export const resultOrder = (teams: Ileader[]) =>
  teams.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });
