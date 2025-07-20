import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TraineeControllers } from './trainee.controller';
import { updateTraineeValidationSchema } from './trainee.zodValidation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth('trainee'), TraineeControllers.getAllTrainees);

router.get('/:id', auth('trainee'), TraineeControllers.getSingleTrainee);

router.patch(
  '/:id',
  auth('trainee'),
  validateRequest(updateTraineeValidationSchema),
  TraineeControllers.updateTrainee,
);

router.delete('/:id', auth('trainee'), TraineeControllers.deleteTrainee);

export const TraineeRoutes = router;
