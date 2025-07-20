import AppError from '../../errors/AppError';
import { Trainee } from '../trainee/trainee.model';
import { Trainer } from '../trainer/trainer.model';
import { TClassSchedule } from './classSchedule.interface';
import httpStatus from 'http-status';
import { ClassSchedule } from './classSchedule.model';
import { hasTimeConflict } from './classSchedule.utils';
import mongoose from 'mongoose';

const createClassScheduleIntoDB = async (payload: TClassSchedule) => {
  const {
    trainee,
    trainer,
    maxTrainees,
    classScheduleDate,
    startTime,
    endTime,
  } = payload;

  // console.log('payload:', payload);

  // Step 1: Validate trainee
  const isTraineeExists = await Trainee.findById(trainee);
  if (!isTraineeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Trainee not found!');
  }

  // Step 2: Validate trainer
  const isTrainerExists = await Trainer.findById(trainer);
  if (!isTrainerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Trainer not found!');
  }

  // Step 3: Validate 2-hour duration
  const start = parseInt(startTime.split(':')[0]);
  const end = parseInt(endTime.split(':')[0]);

  if (end - start !== 2) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Each class must be exactly 2 hours.',
    );
  }

  // Step 4: Enforce max 5 classes per day per trainer
  const ScheduleCount = await ClassSchedule.countDocuments({
    classScheduleDate,
  });
  // console.log(ScheduleCount);
  if (ScheduleCount >= 5) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'admin cannot created more than 5 classes per day.',
    );
  }

  // Step 5: Time conflict check
  const existingSchedules = await ClassSchedule.find({
    classScheduleDate,
  });

  const hasConflict = hasTimeConflict(existingSchedules, {
    startTime,
    endTime,
  });

  if (hasConflict) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Time conflict with an existing schedule.',
    );
  }

  // Step 6: Validate maxTrainees
  if (maxTrainees && maxTrainees > 10) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Each class can have at most 10 trainees.',
    );
  }

  // Final Step: Create the schedule
  const result = await ClassSchedule.create(payload);
  return result;
};

const getAllClassSchedulesFromDB = async () => {
  const result = await ClassSchedule.find();
  return result;
};

const getSingleClassScheduleFromDB = async (id: string) => {
  const result = await ClassSchedule.findById(id);
  return result;
};

const assignTrainerToSchedule = async (
  scheduleId: string,
  trainerId: string,
) => {
  const schedule = await ClassSchedule.findById(scheduleId);
  // console.log(schedule);
  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, 'Class schedule not found');
  }

  const trainer = await Trainer.findById(trainerId);
  // console.log(trainer);
  if (!trainer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Trainer not found');
  }

  // Optional: limit trainer to 5 schedules/day
  const trainerSchedules = await ClassSchedule.countDocuments({
    classScheduleDate: schedule.classScheduleDate,
    trainer: trainerId,
  });

  if (trainerSchedules >= 5) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Trainer already has 5 schedules on this day',
    );
  }
  const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
  schedule.trainer = trainerObjectId;
  const updatedSchedule = await schedule.save();
  return updatedSchedule;
};

const deleteClassScheduleFromDB = async (id: string) => {
  const isClassScheduleExists = await ClassSchedule.findById(id);

  if (!isClassScheduleExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Class schedule is not found');
  }
  const result = await ClassSchedule.deleteOne({ _id: isClassScheduleExists });
  return result;
};
export const ClassScheduleServices = {
  createClassScheduleIntoDB,
  getAllClassSchedulesFromDB,
  getSingleClassScheduleFromDB,
  assignTrainerToSchedule,
  deleteClassScheduleFromDB,
};
