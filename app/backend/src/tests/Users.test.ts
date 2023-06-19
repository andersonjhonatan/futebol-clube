import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users.model';

import { Model } from 'sequelize';
import { Response } from 'superagent';

chai.use(chaiHttp);

const secretKey = process.env.JWT_SECRET || '';

const { expect, request } = chai;

describe('Testes para o endpoint /login', () => {
  beforeEach(sinon.restore);

  const user = new Users({
    id: 1,
    username: 'exemplo exemplo',
    role: 'admin',
    email: 'admin@admin.com',
    password: '1234567',
  });

  it('retornar um token', async () => {
    const reqBody = { email: 'admin@admin.com', password: '1234567' };

    sinon.stub(Model, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const { status, body } = await request(app).post('/login').send(reqBody);

    expect(status).to.be.equal(200);
    expect(body).to.haveOwnProperty('token');
  });

  it('retornar um erro de invalidade de email caso não exista email ', async () => {
    const reqBody = { email: '', password: '1234567' };

    sinon.stub(Model, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const { status, body } = await request(app).post('/login').send(reqBody);

    expect(status).to.be.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('retornar um erro de invalidade de email caso esteja no formato errado ', async () => {
    const reqBody = { email: 'admindmincom', password: '1234567' };

    sinon.stub(Model, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const { status, body } = await request(app).post('/login').send(reqBody);

    expect(status).to.be.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('retornar um erro de invalidade de senha ', async () => {
    const reqBody = { email: 'admin@admin.com', password: '12345678' };

    sinon.stub(Model, 'findOne').resolves(user);

    const { status, body } = await request(app).post('/login').send(reqBody);

    expect(status).to.be.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('retornar um erro de invalidade caso nao exista a senha ', async () => {
    const reqBody = { email: 'admin@admin.com', password: '' };

    sinon.stub(Model, 'findOne').resolves(user);

    const { status, body } = await request(app).post('/login').send(reqBody);

    expect(status).to.be.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  describe('Teste da outra aplicação login/role', () => {
    beforeEach(sinon.restore);

    const user = {
      id: 1,
      username: 'Anderson Jhonatan',
      role: 'admin',
      email: 'anderson@gmail.com',
    };

    it('Deve retornar role: admin', async () => {
      const tokenResult = jwt.sign(user, secretKey);
      const { status, body } = await request(app)
        .get('/login/role')
        .set('Authorization', tokenResult);

      expect(status).to.deep.equal(200);
      expect(body).to.deep.equal({ role: 'admin' });
    });

    it('Deve retornar um erro sem o toke estiver ausente', async () => {
      const { status, body } = await request(app).get('/login/role');

      expect(status).to.deep.equal(401);
      expect(body).to.deep.equal({ message: 'Token not found' });
    });

    it('Deve retornar um erro se o token for inválido', async () => {
      const { status, body } = await request(app)
        .get('/login/role')
        .set('Authorization', 'Invalido');

      expect(status).to.deep.equal(401);
      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});
