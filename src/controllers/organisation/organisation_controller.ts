import { Request, Response } from "express";
import organisationService from "../../services/settings/organisation_services";

class OrganisationController {

  async updateOrganisation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedOrganisation = await organisationService.updateOrganisation(
        id,
        data
      );
      res.json(updatedOrganisation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update organisation" });
    }
  }

  async deleteOrganisation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await organisationService.deleteOrganisation(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete organisation" });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { newPassword } = req.body;
      const updated = await organisationService.changePassword(id, newPassword);
      if (!updated) {
        return res.status(404).json({ error: "Organisation not found" });
      }
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update password" });
    }
  }

  async updateDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const details = req.body;
      const updatedOrganisation = await organisationService.updateDetails(
        id,
        details
      );
      if (!updatedOrganisation) {
        return res.status(404).json({ error: "Organisation not found" });
      }
      res.json(updatedOrganisation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update organisation details" });
    }
  }
}

export default new OrganisationController();
