import { Request, Response } from "express";
import { SingletonClass } from "../../utils/singleton_class";
import { getMe } from "../../services/user-services/user.service";

class UsersController {
  async getData(req: Request, res: Response) {
    return getMe(req, res);
  }
}

const methods = SingletonClass(UsersController);
export default methods;
