import { NextFunction, Request, Response } from "express";
import { login } from "../../services/auth-services/auth.service";
import { SingletonClass } from "../../utils/singleton_class";

class LoginController {
  async Login(req: Request, res: Response, next: NextFunction) {
    return login(req, res, next);
  }
}

const methods = SingletonClass(LoginController);
export default methods;
