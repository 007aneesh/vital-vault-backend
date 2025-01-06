import { Request, Response } from "express";
import organisationService from "../../services/settings/organisation_services";

class OrganisationController {
  async updateOrganisation(req: any, res: Response) {
    try {
      const id = req?.payload?.id;
      const data = req.body;

      const updatedOrganisation = await organisationService.updateOrganisation(
        id,
        data
      );

      res.status(200).json(updatedOrganisation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update organisation" });
    }
  }

  async deleteOrganisation(req: any, res: Response) {
    try {
      const id = req?.payload?.id;
      await organisationService.deleteOrganisation(id);
      res.status(200).json({ message: "Organisation deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete organisation" });
    }
  }

  async changePassword(req: any, res: Response) {
    try {
      const id = req?.payload?.id;
      const { new_password } = req.body;
      const updated = await organisationService.changePassword(
        id,
        new_password
      );
      if (updated) {
        res.json({ message: "Password updated successfully" });
      } else {
        res.status(404).json({ error: "Organisation not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update password" });
    }
  }
}

export default new OrganisationController();
