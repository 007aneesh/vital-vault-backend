import { Request, Response, NextFunction } from "express";
import { CreateAppointmentSchema } from "../../validations/appointment_validation";
import { sendError, sendSuccess } from "../../utils/handle_response";
import { SingletonClass } from "../../utils/singleton_class";
import AppError from "../../utils/appError";
import { prisma } from "../../utils/db";

class AppointmentController {
  async createAppointment(req: Request, res: Response) {
    const data = CreateAppointmentSchema.safeParse(req.body);
    if (!data.success) {
      // const errors = data.error.issues.reduce(
      //   (acc, issue) => {
      //     acc[issue.path.join(".")] = issue.message;
      //     return acc;
      //   },
      //   {} as Record<string, string>,
      // );

      return sendError(res, data.error, 422);
    }

    const {
      appointment_date,
      reason_for_visit,
      patient_id,
      employee_id,
      status,
    } = data.data;
    const newAppointment = await prisma.appointment.create({
      data: {
        appointment_date,
        reason_for_visit,
        patient_id,
        employee_id,
        status: status || "PENDING",
      },
      include: {
        patient: true,
        employee: true,
      },
    });

    return sendSuccess(
      res,
      "Appointment created successfully",
      201,
      newAppointment,
    );
  }

  async getAllAppointments(req: Request, res: Response) {
    const { patientId } = req.query;

    const appointments = await prisma.appointment.findMany({
      where: {
        ...(patientId ? { patient_id: patientId as string } : {}),
      },
      include: {
        patient: true,
        employee: true,
      },
      orderBy: { appointment_date: "asc" },
    });

    return sendSuccess(res, "Fetched all appointments", 200, appointments);
  }

  async getAppointmentById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, employee: true },
    });

    if (!appointment) {
      return next(new AppError(404, "Appointment not found"));
    }

    return sendSuccess(res, "Appointment found", 200, appointment);
  }

  async updateAppointment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { appointment_date, reason_for_visit, status } = req.body;

    const updateData: any = {};
    if (appointment_date)
      updateData.appointment_date = new Date(appointment_date);
    if (reason_for_visit) updateData.reason_for_visit = reason_for_visit;
    if (status) updateData.status = status;

    if (Object.keys(updateData).length === 0) {
      return next(new AppError(400, "No valid fields provided for update"));
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: updateData,
    });

    return sendSuccess(
      res,
      "Appointment updated successfully",
      200,
      updatedAppointment,
    );
  }

  async deleteAppointment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const deletedAppointment = await prisma.appointment
      .delete({
        where: { id },
      })
      .catch(() => null);

    if (!deletedAppointment) {
      return next(new AppError(404, "Appointment not found"));
    }

    return sendSuccess(res, "Appointment deleted successfully", 200);
  }
}

const methods = SingletonClass(AppointmentController);
export default methods;
