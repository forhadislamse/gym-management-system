import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { updateTrainerValidationSchema } from './trainer.zodValidation';
import { TrainerControllers } from './trainer.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth('admin'), TrainerControllers.getAllTrainers);

router.get('/:id', auth('admin'), TrainerControllers.getSingleTrainer);
router.get(
  '/my-class-schedule',
  auth('trainer'),
  TrainerControllers.getTrainerClassSchedule,
);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(updateTrainerValidationSchema),
  TrainerControllers.updateTrainer,
);

router.delete('/:id', auth('admin'), TrainerControllers.deleteTrainer);

export const TrainerRoutes = router;
