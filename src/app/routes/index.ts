import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { TrainerRoutes } from '../modules/trainer/trainer.route';
import { TraineeRoutes } from '../modules/trainee/trainee.route';
import { ClassScheduleRoutes } from '../modules/classSchedule/classSchedule.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/trainers',
    route: TrainerRoutes,
  },
  {
    path: '/trainees',
    route: TraineeRoutes,
  },
  {
    path: '/schedules',
    route: ClassScheduleRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];
// //no return
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
