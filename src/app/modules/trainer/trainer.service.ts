/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Trainer } from './trainer.model';
import { TTrainer } from './trainer.interface';
import { ClassSchedule } from '../classSchedule/classSchedule.model';

const getAllTrainersFromDB = async () => {
  const result = await Trainer.find();
  return result;
};

const getSingleTrainerFromDB = async (id: string) => {
  const result = await Trainer.findById(id);
  return result;
};

const updateTrainerIntoDB = async (id: string, payload: Partial<TTrainer>) => {
  const result = await Trainer.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getTrainerClassScheduleFromDB = async (trainerId: string) => {
  console.log('trainer:', trainerId);
  const trainer = await Trainer.findOne({ id: trainerId });
  console.log(trainer);
  if (!trainer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Trainer not found');
  }

  const trainerClassSchedule = await ClassSchedule.find({
    trainer: trainer._id,
  }).populate('trainee');
  return trainerClassSchedule;
};
const deleteTrainerFromDB = async (id: string) => {
  // 1. Validate ID format (no transaction needed)
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid trainer ID format');
  }

  // 2. Using the static method to check if trainer exists (still outside transaction)
  const existingTrainer = await Trainer.isUserExists(id);
  if (!existingTrainer || existingTrainer.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'trainer does not exist or has already been deleted',
    );
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedTrainer = await Trainer.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedTrainer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete trainer');
    }

    // get user _id from deletedTrainer
    const userId = deletedTrainer.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();

    return deletedTrainer;
  } catch (err: any) {
    await session.abortTransaction();

    throw err;
  } finally {
    await session.endSession();
  }
};

export const TrainerServices = {
  getAllTrainersFromDB,
  getSingleTrainerFromDB,
  updateTrainerIntoDB,
  getTrainerClassScheduleFromDB,
  deleteTrainerFromDB,
};
