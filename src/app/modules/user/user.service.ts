/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TAdmin } from '../admin/admin.interface';
import { IUser } from './user.interface';
import {
  generateAdminId,
  generateTraineeId,
  generateTrainerId,
} from './user.utils';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Admin } from '../admin/admin.model';
import { TTrainer } from '../trainer/trainer.interface';
import { Trainer } from '../trainer/trainer.model';
import { TTrainee } from '../trainee/trainee.interface';
import { Trainee } from '../trainee/trainee.model';

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);
  // console.log(userData.password);
  //set admin role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createTrainerIntoDB = async (password: string, payload: TTrainer) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);
  // console.log(userData.password);
  //set trainer role
  userData.role = 'trainer';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateTrainerId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a trainer
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create trainer');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a trainer (transaction-2)
    const newTrainer = await Trainer.create([payload], { session });

    if (!newTrainer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create trainer');
    }

    await session.commitTransaction();
    await session.endSession();

    return newTrainer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createTraineeIntoDB = async (password: string, payload: TTrainee) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);
  // console.log(userData.password);
  //set trainee role
  userData.role = 'trainee';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateTraineeId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a trainee
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create trainee');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a trainee (transaction-2)
    const newTrainee = await Trainee.create([payload], { session });

    if (!newTrainee.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create trainee');
    }

    await session.commitTransaction();
    await session.endSession();

    return newTrainee;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createAdminIntoDB,
  createTrainerIntoDB,
  createTraineeIntoDB,
};
