import { Request, Response } from "express";
import DashboardService from "../../services/dashboard/dashboard_services";
import { sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";

class DashboardController {
  async getDashboardStats(req: Request, res: Response) {
    const stats = await DashboardService.getDashboardStats();
    return sendSuccess(res, "Dashboard stats fetched successfully", 200, stats);
  }
}

const methods = SingletonClass(DashboardController);
export default methods.config;
