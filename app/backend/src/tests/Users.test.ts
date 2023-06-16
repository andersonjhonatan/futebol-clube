import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

/* describe('Testes para o endpoint /login', () => {
  beforeEach(() => {});
  it('Deve retornar o código de status 200 e um token de acesso válido', async () => {
    let chaiHttpResponse: Response;

    const loginStube: Users[] = [
      {
        id: 1,
        username: 'sds',
        role: 'exemplo',
        email: 'tfc@projeto.com',
        password: 'asdfgh',
      } as Users,
    ];

    sinon.stub(Users, 'findOrCreate').resolves(loginStube);

    chaiHttpResponse = await chai.request(app).post('/login');

    expect(chaiHttpResponse.status).to.equal(200);
  });
}); */
