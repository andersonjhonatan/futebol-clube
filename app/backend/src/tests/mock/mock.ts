
import Matches from '../../database/models/MatchesModel';
import Teams from '../../database/models/Teams.model';


const listMock: Matches[] = [
  new Matches({
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  }),
  new Matches({
    id: 2,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: 'Flamengo',
    },
    awayTeam: {
      teamName: 'Cruzeiro',
    },
  }),
];

const listMockAllTeams1: Teams[] = [
  new Teams({ id: 1, teamName: 'Flamengo' }),
  new Teams({ id: 2, teamName: 'Cruzeiro' }),
];

const listMockAllTeams2 = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
  },
];

const user = {
  id: 1,
  username: 'Anderson Jhonatan',
  role: 'admin',
  email: 'anderson@gmail.com',
};

export { user, listMockAllTeams2, listMockAllTeams1, listMock}