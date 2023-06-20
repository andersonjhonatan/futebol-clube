import * as jwt from 'jsonwebtoken';
import LoginJWT from '../Interfaces/LoginJWT';

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (login: LoginJWT) =>
  jwt.sign(login, secretKey, { expiresIn: '20d', algorithm: 'HS256' });

export default generateToken;
