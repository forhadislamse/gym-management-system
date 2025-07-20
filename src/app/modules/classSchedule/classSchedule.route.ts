import express from 'express';

import { ClassScheduleControllers } from './classSchedule.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  assignTrainerValidationSchema,
  createClassScheduleValidationSchema,
} from './classSchedule.zodValidation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-schedule',
  auth('admin'),
  validateRequest(createClassScheduleValidationSchema),
  ClassScheduleControllers.createClassSchedule,
);

router.get(
  '/',
  auth('admin', 'trainee'),
  ClassScheduleControllers.getAllClassSchedules,
);
router.get(
  '/:id',
  auth('admin', 'trainee'),
  ClassScheduleControllers.getSingleClassSchedule,
);

router.patch(
  '/assign-trainer/:scheduleId',
  auth('admin'),
  validateRequest(assignTrainerValidationSchema),
  ClassScheduleControllers.assignTrainerToSchedule,
);

router.delete(
  '/:id',
  auth('admin'),
  ClassScheduleControllers.deleteClassSchedule,
);

export const ClassScheduleRoutes = router;
