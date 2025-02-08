import { Request, Response } from "express";
import { login, userLogin } from "../../services/auth-services/auth.service";
import { SingletonClass } from "../../utils/singleton_class";

class LoginController {
  async adminLogin(req: Request, res: Response) {
    return login(req, res, {
      identifier: "username",
      notRegisteredError: "Not registered!!",
    });
  }

  // async employeeLogin(req: Request, res: Response) {
  //   return login(req, res, {
  //     identifier: "username",
  //     notRegisteredError: "Employee not registered with organisation!!",
  //   });
  // }

  async patientLogin(req: Request, res: Response) {
    return userLogin(req, res, {
      identifier: "username",
      notRegisteredError: "Patient not registered!!",
    });
  }
}

const methods = SingletonClass(LoginController);
export default methods;
