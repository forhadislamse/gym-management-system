import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';
import { Gender } from './admin.constant';

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'Admin ID is required.'],
      unique: true,
    },
    // here we use User model for referencing
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender.',
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      // type: Date,
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    address: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if user is already exist!
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findById(id);
  return existingUser;
};
export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
