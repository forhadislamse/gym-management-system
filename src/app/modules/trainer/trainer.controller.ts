import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TrainerServices } from './trainer.service';

const getAllTrainers = catchAsync(async (req, res) => {
  const result = await TrainerServices.getAllTrainersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer are retrieved successfully',
    data: result,
  });
});

const getSingleTrainer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TrainerServices.getSingleTrainerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer is retrieved successfully',
    data: result,
  });
});
const getTrainerClassSchedule = catchAsync(async (req, res) => {
  const { userId } = req.user;
  console.log('abc,', req.user);
  const result = await TrainerServices.getTrainerClassScheduleFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer class schedule retrieve successfully',
    data: result,
  });
});
const updateTrainer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { trainer } = req.body;
  const result = await TrainerServices.updateTrainerIntoDB(id, trainer);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer is updated successfully',
    data: result,
  });
});

const deleteTrainer = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  const result = await TrainerServices.deleteTrainerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer is deleted successfully',
    data: result,
  });
});

export const TrainerControllers = {
  getAllTrainers,
  getSingleTrainer,
  deleteTrainer,
  getTrainerClassSchedule,
  updateTrainer,
};
