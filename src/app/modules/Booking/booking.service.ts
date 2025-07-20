/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Booking } from './booking.model';
import { ClassSchedule } from '../classSchedule/classSchedule.model';
import { Trainee } from '../trainee/trainee.model';

export const createBookingIntoDB = async (
  classScheduleID: string,
  traineeID: string,
) => {
  try {
    // Find the class schedule
    const classSchedule = await ClassSchedule.findById(classScheduleID);
    if (!classSchedule) {
      throw new AppError(httpStatus.BAD_REQUEST, "'Class schedule not found");
    }

    // Check if the class is already full
    if (classSchedule.trainee.length >= classSchedule.maxTrainees) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Class schedule is full. Maximum 10 trainees allowed per schedule.',
      );
    }

    // Check if the trainee is already booked
    const existingBooking = await Booking.findOne({
      classSchedule: classScheduleID,
      trainee: traineeID,
    });
    if (existingBooking) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Trainee is already booked for this class',
      );
    }

    const bookingData = {
      classSchedule: new mongoose.Types.ObjectId(classScheduleID),
      trainee: new mongoose.Types.ObjectId(traineeID),
      trainer: classSchedule.trainer, // this should already be ObjectId
    };

    // Create the booking
    const result = await Booking.create([bookingData]);

    // Add trainee to the class schedule
    const traineeIDObj = new mongoose.Types.ObjectId(traineeID);
    classSchedule.trainee.push(traineeIDObj);
    await classSchedule.save();

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const cancelBookingIntoDB = async (bookingID: string) => {
  try {
    // Find the booking
    const booking = await Booking.findById(bookingID);
    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    // Remove the trainee from the class schedule
    const classSchedule = await ClassSchedule.findById(booking.classSchedule);
    if (classSchedule) {
      classSchedule.trainee = classSchedule.trainee.filter(
        (traineeID) => traineeID.toString() !== booking.trainee.toString(),
      );
      await classSchedule.save();
    }

    // Delete the booking
    const result = await Booking.findByIdAndDelete(bookingID);

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getMyAllBooking = async (customId: string) => {
  // Look up trainee using custom `id` field (not _id)
  const trainee = await Trainee.findOne({ id: customId });

  if (!trainee) {
    throw new AppError(404, 'Trainee not found');
  }

  // Use the actual ObjectId (_id)
  return Booking.find({ trainee: trainee._id }).populate('classSchedule');
};

export const BookingServices = {
  createBookingIntoDB,
  cancelBookingIntoDB,
  getMyAllBooking,
};
