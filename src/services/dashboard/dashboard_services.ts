import { prisma } from "../../utils/db";

class DashboardService {
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch all stats concurrently
    const [
      totalPatients,
      todayPatients,
      appointmentsToday,
      pendingAppointments,
      totalStaff,
      upcomingAppointments,
      weeklyTrendRaw,
    ] = await Promise.all([
      // 1. Patient Stats
      prisma.patient.count(),
      prisma.patient.count({
        where: { created_at: { gte: today } },
      }),

      // 2. Overview Stats (Appointments Today)
      prisma.appointment.count({
        where: {
          appointment_date: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),

      // 3. Pending Actions
      prisma.appointment.count({
        where: { status: "PENDING" },
      }),

      // 4. Staff Count (Active Doctors/Staff proxy)
      prisma.employee.count(),

      // 5. Recent/Upcoming Appointments (Next 5)
      prisma.appointment.findMany({
        where: {
          appointment_date: { gte: today },
        },
        take: 5,
        orderBy: { appointment_date: "asc" },
        include: {
          patient: {
            select: {
              first_name: true,
              last_name: true,
              image: true,
            },
          },
          employee: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      }),

      // 6. Weekly Trends (Last 7 days)
      prisma.appointment.findMany({
        where: {
          appointment_date: {
            gte: sevenDaysAgo,
            lte: new Date(),
          },
        },
        select: {
          appointment_date: true,
        },
      }),
    ]);

    return {
      overview: {
        totalPatients,
        todayPatients,
        appointmentsToday,
        pendingAppointments,
        totalStaff,
      },
      recentActivity: upcomingAppointments,
      weeklyStats: this.processWeeklyTrends(weeklyTrendRaw),
    };
  }

  private processWeeklyTrends(appointments: { appointment_date: Date }[]) {
    const daysMap = new Map<string, number>();
    const result: { name: string; total: number }[] = [];

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      daysMap.set(dayName, 0);
      result.push({ name: dayName, total: 0 });
    }

    // Count
    appointments.forEach((app) => {
      const dayName = new Date(app.appointment_date).toLocaleDateString(
        "en-US",
        { weekday: "short" },
      );
      const index = result.findIndex((r) => r.name === dayName);
      if (index !== -1) {
        result[index].total++;
      }
    });

    return result;
  }
}

export default new DashboardService();
