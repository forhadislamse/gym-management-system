/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllAdminsFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const result = await Admin.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteAdminFromDB = async (id: string) => {
  // 1. Validate ID format (no transaction needed)
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid admin ID format');
  }

  // 2. Using the static method to check if admin exists (still outside transaction)
  const existingAdmin = await Admin.isUserExists(id);
  if (!existingAdmin || existingAdmin.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'admin does not exist or has already been deleted',
    );
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();

    throw err;
  } finally {
    await session.endSession();
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
