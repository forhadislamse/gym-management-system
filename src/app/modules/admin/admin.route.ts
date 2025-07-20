import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateAdminValidationSchema } from './admin.zodValidation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth('admin'), AdminControllers.getAllAdmins);

router.get('/:id', auth('admin'), AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', auth('admin'), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
