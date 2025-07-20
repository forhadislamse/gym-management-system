import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createNewBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.createBookingIntoDB(
    req.params.classScheduleID,
    user._id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class booked successfully',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.cancelBookingIntoDB(
    req.params.bookingID,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cancel class booking successfully',
    data: result,
  });
});

const getMyAllBooking = catchAsync(async (req, res) => {
  console.log(req.user);
  const traineeId = req.user.userId;

  const result = await BookingServices.getMyAllBooking(traineeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createNewBooking,
  cancelBooking,
  getMyAllBooking,
};
