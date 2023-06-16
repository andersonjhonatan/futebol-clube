import { sign } from 'jsonwebtoken';
import LoginJWT from '../Interfaces/LoginJWT';

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (login: LoginJWT) =>
  sign(login, secretKey, { expiresIn: '1d', algorithm: 'HS256' });

export default generateToken;