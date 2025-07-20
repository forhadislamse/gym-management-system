import express from 'express';
import auth from '../../middlewares/auth';

import { BookingControllers } from './booking.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create/:classScheduleID',
  auth(USER_ROLE.trainee),
  BookingControllers.createNewBooking,
);

router.get(
  '/my-bookings',
  auth(USER_ROLE.trainee),
  BookingControllers.getMyAllBooking,
);

router.delete(
  '/:bookingID',
  auth(USER_ROLE.trainee),
  BookingControllers.cancelBooking,
);

export const BookingRoutes = router;
