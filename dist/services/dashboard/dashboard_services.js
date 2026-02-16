"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../utils/db");
class DashboardService {
    getDashboardStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            // Fetch all stats concurrently
            const [totalPatients, todayPatients, appointmentsToday, pendingAppointments, totalStaff, upcomingAppointments, weeklyTrendRaw,] = yield Promise.all([
                // 1. Patient Stats
                db_1.prisma.patient.count(),
                db_1.prisma.patient.count({
                    where: { created_at: { gte: today } },
                }),
                // 2. Overview Stats (Appointments Today)
                db_1.prisma.appointment.count({
                    where: {
                        appointment_date: {
                            gte: today,
                            lt: tomorrow,
                        },
                    },
                }),
                // 3. Pending Actions
                db_1.prisma.appointment.count({
                    where: { status: "PENDING" },
                }),
                // 4. Staff Count (Active Doctors/Staff proxy)
                db_1.prisma.employee.count(),
                // 5. Recent/Upcoming Appointments (Next 5)
                db_1.prisma.appointment.findMany({
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
                db_1.prisma.appointment.findMany({
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
        });
    }
    processWeeklyTrends(appointments) {
        const daysMap = new Map();
        const result = [];
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
            const dayName = new Date(app.appointment_date).toLocaleDateString("en-US", { weekday: "short" });
            const index = result.findIndex((r) => r.name === dayName);
            if (index !== -1) {
                result[index].total++;
            }
        });
        return result;
    }
}
exports.default = new DashboardService();
//# sourceMappingURL=dashboard_services.js.map