import IPatchIDGoals from './IPatchIDGoals';

export default interface ICreateMatch extends IPatchIDGoals {
  homeTeamId: number;
  awayTeamId: number;
}
