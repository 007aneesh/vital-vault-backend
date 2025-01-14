import { Request, Response } from "express";
import { login } from "../../services/auth-services/login";
import { Models } from "../../utils/constant";
import { ModelType } from "../../utils/types";
import { SingletonClass } from "../../utils/singleton_class";

class LoginController {
  async adminLogin(req: Request, res: Response) {
    return login(req, res, {
      model: Models.ORGANISATION as ModelType,
      identifier: "username",
      notRegisteredError: "Organisation not registered!!",
    });
  }

  async employeeLogin(req: Request, res: Response) {
    return login(req, res, {
      model: Models.EMPLOYEE as ModelType,
      identifier: "username",
      notRegisteredError: "Employee not registered with organisation!!",
    });
  }

  async patientLogin(req: Request, res: Response) {
    return login(req, res, {
      model: Models.PATIENT as ModelType,
      identifier: "aadhar_number",
      notRegisteredError: "Patient not registered!!",
    });
  }
}

const methods = SingletonClass(LoginController);
export default methods;
