import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TraineeServices } from './trainee.service';

const getAllTrainees = catchAsync(async (req, res) => {
  const result = await TraineeServices.getAllTraineesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee are retrieved successfully',
    data: result,
  });
});

const getSingleTrainee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TraineeServices.getSingleTraineeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee is retrieved successfully',
    data: result,
  });
});

const updateTrainee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { trainee } = req.body;
  const result = await TraineeServices.updateTraineeIntoDB(id, trainee);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee is updated successfully',
    data: result,
  });
});

const deleteTrainee = catchAsync(async (req, res) => {
  const { id } = req.params;
  //   console.log(req.params);
  const result = await TraineeServices.deleteTraineeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainee is deleted successfully',
    data: result,
  });
});

export const TraineeControllers = {
  getAllTrainees,
  getSingleTrainee,
  deleteTrainee,
  updateTrainee,
};
