import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassScheduleServices } from './classSchedule.service';

const createClassSchedule = catchAsync(async (req, res) => {
  const result = await ClassScheduleServices.createClassScheduleIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class schedule created successfully',
    data: result,
  });
});

const getAllClassSchedules = catchAsync(async (req, res) => {
  const result = await ClassScheduleServices.getAllClassSchedulesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class Schedule is retrieved successfully',
    data: result,
  });
});

const getSingleClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClassScheduleServices.getSingleClassScheduleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Class Schedule is retrieved successfully',
    data: result,
  });
});

const assignTrainerToSchedule = catchAsync(async (req, res) => {
  const { scheduleId } = req.params;
  const { trainerId } = req.body;

  // console.log(req.params, req.body);

  const result = await ClassScheduleServices.assignTrainerToSchedule(
    scheduleId,
    trainerId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer assigned to class schedule successfully!',
    data: result,
  });
});

const deleteClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClassScheduleServices.deleteClassScheduleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class schedule deleted successfully',
    data: result,
  });
});

export const ClassScheduleControllers = {
  createClassSchedule,
  getAllClassSchedules,
  getSingleClassSchedule,
  assignTrainerToSchedule,
  deleteClassSchedule,
};
