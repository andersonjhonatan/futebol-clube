import { Request, Response } from 'express';
import UserService from '../service/User.service';

class UserControllerClass {
  private _service: UserService;

  constructor() {
    this._service = new UserService();
  }

  public loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { type, message, token } = await this._service.loginService(email, password);

    if (type) return res.status(type).json({ message });

    return res.status(200).json({ token });
  };
}

export default UserControllerClass;
