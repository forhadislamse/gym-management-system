/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Trainee } from './trainee.model';
import { TTrainee } from './trainee.interface';

const getAllTraineesFromDB = async () => {
  const result = await Trainee.find();
  return result;
};

const getSingleTraineeFromDB = async (id: string) => {
  const result = await Trainee.findById(id);
  return result;
};

const updateTraineeIntoDB = async (id: string, payload: Partial<TTrainee>) => {
  const result = await Trainee.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteTraineeFromDB = async (id: string) => {
  // 1. Validate ID format (no transaction needed)
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid trainee ID format');
  }

  // 2. Using the static method to check if trainee exists (still outside transaction)
  const existingTrainee = await Trainee.isUserExists(id);
  if (!existingTrainee || existingTrainee.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'trainee does not exist or has already been deleted',
    );
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedTrainee = await Trainee.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedTrainee) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete trainee');
    }

    // get user _id from deletedTrainee
    const userId = deletedTrainee.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();

    return deletedTrainee;
  } catch (err: any) {
    await session.abortTransaction();

    throw err;
  } finally {
    await session.endSession();
  }
};

export const TraineeServices = {
  getAllTraineesFromDB,
  getSingleTraineeFromDB,
  updateTraineeIntoDB,
  deleteTraineeFromDB,
};
