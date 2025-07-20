import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.zodValidation';
import { UserControllers } from './user.controller';
import { createTrainerValidationSchema } from '../trainer/trainer.zodValidation';
import { createTraineeValidationSchema } from '../trainee/trainee.zodValidation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/create-trainer',
  auth('admin'),
  validateRequest(createTrainerValidationSchema),
  UserControllers.createTrainer,
);
router.post(
  '/create-trainee',
  auth('trainee'),
  validateRequest(createTraineeValidationSchema),
  UserControllers.createTrainee,
);
export const UserRoutes = router;
