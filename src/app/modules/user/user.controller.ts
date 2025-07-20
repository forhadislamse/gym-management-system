import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.service';

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  // console.log(req.body);

  const result = await UserServices.createAdminIntoDB(password, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const createTrainer = catchAsync(async (req, res) => {
  const { password, trainer: trainerData } = req.body;
  // console.log(req.body);

  const result = await UserServices.createTrainerIntoDB(password, trainerData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer is created successfully',
    data: result,
  });
});

const createTrainee = catchAsync(async (req, res) => {
  const { password, trainee: traineeData } = req.body;
  // console.log(req.body);

  const result = await UserServices.createTraineeIntoDB(password, traineeData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createTrainer,
  createTrainee,
};
