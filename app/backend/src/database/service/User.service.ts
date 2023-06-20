import { ModelStatic } from 'sequelize';
import { compareSync } from 'bcryptjs';
import UserModel from '../models/Users.model';
import generateToken from '../../utils/jwt.token';

class UserServiceClass {
  protected model: ModelStatic<UserModel> = UserModel;

  loginService = async (email: string, password: string) => {
    const resultUser = await this.model.findOne({ where: { email } });

    if (!resultUser) {
      return { type: 401, message: 'Invalid email or password' };
    }
    const validPassword = compareSync(password, resultUser.password);

    if (validPassword) {
      return {
        token: generateToken({
          id: resultUser.id,
          email: resultUser.email,
          username: resultUser.username,
          role: resultUser.role,
        }),
      };
    }

    return { message: 'Invalid email or password', token: null };
  };
}

export default UserServiceClass;
