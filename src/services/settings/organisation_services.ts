import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";
import { Organisation } from "@prisma/client";

// Update Organisation details
const updateOrganisation = async (
  id: string,
  data: Partial<Organisation>,
): Promise<Organisation> => {
  try {
    return await prisma.organisation.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    throw new Error(`Error updating organisation: ${error}`);
  }
};

// Delete Organisation
const deleteOrganisation = async (id: string): Promise<void> => {
  try {
    await prisma.organisation.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Error deleting organisation: ${error}`);
  }
};

// zChange Organisation Password
const changePassword = async (id: string, newPassword: string) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await prisma.entity_Mapping.updateMany({
      where: { ref_id: id },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error(`Error changing password: ${error}`);
  }
};

export default {
  updateOrganisation,
  deleteOrganisation,
  changePassword,
};
