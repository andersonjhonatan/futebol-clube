import { Request, Response, Router } from 'express';

import UserControllerClass from '../controller/Users.controller';
import tokenVerify from '../middleware/Token.middlewares';
import loginMiddlewares from '../middleware/Login.middlewares';

const UserRouter = Router();

const userNewController = new UserControllerClass();

UserRouter.get(
  '/login/role',
  tokenVerify,
  (_req: Request, res: Response) => res.status(200).json({ role: res.locals.user.role }),
);
UserRouter.post('/login', loginMiddlewares, userNewController.loginController);

export default UserRouter;
