import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import LoginJWT from '../Interfaces/LoginJWT';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (login: LoginJWT) =>
  sign(login, secretKey, { expiresIn: '2d' });

export default generateToken;
