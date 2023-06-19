import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de cobertura mínima para os arquivos em /app/backend/src', () => {
  beforeEach(sinon.restore)

  it('Se busca o time pelo o id ', async () => {
    let chaiHttpResponse: Response;

    const teamStub = {
      id: 1,
      teamName: "Avaí/Kindermann"
    } as Teams

    sinon.stub(Teams, 'findByPk').resolves(teamStub);

    chaiHttpResponse = await chai.request(app).get('/teams/:id');

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Se busca todos os times do db ', async () => {
    let chaiHttpResponse: Response;

    const teamStub: Teams[] = [
      {
        id: 1,
        teamName: 'Example Team'
      } as Teams
    ];

    sinon.stub(Teams, 'findAll').resolves(teamStub);

    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.equal(200);
  });
});
