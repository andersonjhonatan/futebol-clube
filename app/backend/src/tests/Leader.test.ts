import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Teams.model';

import { Model } from 'sequelize';
import Matches from '../database/models/MatchesModel';

chai.use(chaiHttp);

const { expect, request } = chai;

const listMockTeam: Team[] = [
  new Team({ id: 1, teamName: 'Flamengo' }),
  new Team({ id: 2, teamName: 'Bahia' }),
];

const listMockMatche: Matches[] = [
  new Matches({
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: false,
  }),
  new Matches({
    id: 2,
    homeTeamId: 2,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 2,
    inProgress: false,
  }),
];

const listResultMock = [
  {
    name: 'Flamengo',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 1,
    goalsBalance: 1,
    efficiency: '100.00',
  },
  {
    name: 'Bahia',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 2,
    goalsBalance: -1,
    efficiency: '0.00',
  },
];

const listMockTeamMelhores: Team[] = [
  new Team({ id: 1, teamName: 'Corinthians' }),
  new Team({ id: 2, teamName: 'Bahia' }),
];

const listOsMelhores = [

  {
    name: "Corinthians",
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 2,
    goalsBalance: 2,
    efficiency: "100.00"
  },
  {
    name: 'Bahia',
    totalPoints: 0,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 2,
    goalsFavor: 2,
    goalsOwn: 4,
    goalsBalance: -2,
    efficiency: '0.00',
  },
]

describe('Testando a aplicação do endpoint leaderBoard /home', () => {
  beforeEach(sinon.restore);
  it('Os melhores times em casa', async () => {
    sinon
      .stub(Model, 'findAll')
      .onFirstCall()
      .resolves(listMockTeam)
      .onSecondCall()
      .resolves(listMockMatche);
    const result = await request(app).get('/leaderboard/home');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(listResultMock);
  });
});

describe('Testando a aplicação do endpoint leaderBoard /away', () => {
  beforeEach(sinon.restore);
  it('Os melhores times em casa', async () => {
    sinon
      .stub(Model, 'findAll')
      .onFirstCall()
      .resolves(listMockTeam)
      .onSecondCall()
      .resolves(listMockMatche);
    const result = await request(app).get('/leaderboard/away');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(listResultMock);
  });
});

describe('Testando a aplicação do endpoint leaderBoard "/"', () => {
  beforeEach(sinon.restore);
  it('Os melhores times em casa', async () => {
    sinon
      .stub(Model, 'findAll')
      .onFirstCall()
      .resolves(listMockTeamMelhores)
      .onSecondCall()
      .resolves(listMockMatche);
    const result = await request(app).get('/leaderboard');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(listOsMelhores);
  });
});