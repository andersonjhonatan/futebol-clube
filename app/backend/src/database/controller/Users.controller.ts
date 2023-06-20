import { Request, Response } from 'express';
import UserService from '../service/User.service';

class UserControllerClass {
  private _service: UserService;

  constructor() {
    this._service = new UserService();
  }

  public loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { message, token } = await this._service.loginService(email, password);

    if (!token) {
      return res.status(401).json({ message });
    }

    return res.status(200).json({ token });
  };
}

export default UserControllerClass;
