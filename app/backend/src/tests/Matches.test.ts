import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Model } from 'sequelize';

const JWT_SECRET = process.env.JWT_SECRET as string;
chai.use(chaiHttp);

import { listMock, user, listMockAllTeams1, listMockAllTeams2 } from './mock/mock';
const { expect, request } = chai;

describe('Teste da aplicação: GET /matches', () => {
  beforeEach(sinon.restore);

  it('Deve retornar todos as partidas', async () => {
    sinon.stub(Model, 'findAll').resolves(listMock);
    const result = await request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(listMockAllTeams2);
  });
});

describe('Teste da aplicação: GET', () => {
  beforeEach(sinon.restore);

  it('Retornar todas as partidas', async () => {
    sinon.stub(Model, 'findAll').resolves([listMock[1]]);
    const result = await request(app).get('/matches?inProgress=true');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([listMockAllTeams2[1]]);
  });

  it('Retornar todas partidas finalizadas', async () => {
    sinon.stub(Model, 'findAll').resolves([listMock[0]]);
    const result = await request(app).get('/matches?inProgress=false');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([listMockAllTeams2[0]]);
  });
});

describe('Teste da aplicação: PATCH', () => {
  beforeEach(sinon.restore);

  it('Finalizar a partida', async () => {
    const tokenResult =jwt.sign(user, JWT_SECRET);

    sinon.stub(Model, 'update').resolves([1]);
    const result = await request(app)
      .patch('/matches/1/finish')
      .set('Authorization', tokenResult);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({ message: 'Finished' });
  });
});

describe('Teste da aplicação: PATCH ', () => {
  beforeEach(sinon.restore);

  it('Atualizar os gols com o endpoint patch', async () => {
    const tokenResult = jwt.sign(user, JWT_SECRET);

    sinon.stub(Model, 'update').resolves([1]);
    const result = await request(app)
      .patch('/matches/1')
      .set('Authorization', tokenResult);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({ message: 'Atualizando os gols' });
  });
});

describe('Teste da aplicação: POST /matches', () => {
  beforeEach(sinon.restore);

  it('Retornar um erro quando criar partida com a mesma equipe', async () => {
    sinon
      .stub(Model, 'findByPk')
      .onFirstCall()
      .resolves(listMockAllTeams1[0])
      .onSecondCall()
      .resolves(listMockAllTeams1[0]);
    sinon.stub(Model, 'create').resolves(listMock[1]);

    const tokenResult = jwt.sign(user, JWT_SECRET);
    const result = await request(app)
      .post('/matches')
      .send({ homeTeamId: 16, awayTeamId: 16 })
      .set('Authorization', tokenResult);

    expect(result.status).to.be.equal(422);
    expect(result.body).to.deep.equal({
      message: 'It is not possible to create a match with two equal teams',
    });
  });

  it('Deve retornar um erro caso o time de fora não existe', async () => {
    sinon
      .stub(Model, 'findByPk')
      .onFirstCall()
      .resolves(listMockAllTeams1[0])
      .onSecondCall()
      .resolves(null);
    sinon.stub(Model, 'create').resolves(listMock[1]);

    const tokenResult = jwt.sign(user, JWT_SECRET);
    const result = await request(app)
      .post('/matches')
      .send({ homeTeamId: 16, awayTeamId: 99 })
      .set('Authorization', tokenResult);

    expect(result.status).to.be.equal(404);
    expect(result.body).to.deep.equal({
      message: 'There is no team with such id!',
    });
  });
  it('Deve retornar um erro caso o time de casa não existe', async () => {
    sinon
      .stub(Model, 'findByPk')
      .onFirstCall()
      .resolves(null)
      .onSecondCall()
      .resolves(listMockAllTeams1[0]);
    sinon.stub(Model, 'create').resolves(listMock[1]);

    const tokenResult = jwt.sign(user, JWT_SECRET);
    const result = await request(app)
      .post('/matches')
      .send({ homeTeamId: 99, awayTeamId: 16 })
      .set('Authorization', tokenResult);

    expect(result.status).to.be.equal(404);
    expect(result.body).to.deep.equal({
      message: 'There is no team with such id!',
    });
  });

  it('Criando a partida', async () => {
    sinon
      .stub(Model, 'findByPk')
      .onFirstCall()
      .resolves(listMockAllTeams1[0])
      .onSecondCall()
      .resolves(listMockAllTeams1[1]);
    sinon.stub(Model, 'create').resolves(listMock[1]);

    const tokenResult = jwt.sign(user, JWT_SECRET);
    const result = await request(app)
      .post('/matches')
      .send({ homeTeamId: 16, awayTeamId: 8 })
      .set('Authorization', tokenResult);

    expect(result.status).to.be.equal(201);
    expect(result.body).to.deep.equal(listMockAllTeams2[1]);
  });
});
