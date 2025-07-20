import { model, Schema } from 'mongoose';

import { TrainerModel, TTrainer } from './trainer.interface';
import { Gender } from '../admin/admin.constant';

const trainerSchema = new Schema<TTrainer, TrainerModel>(
  {
    id: {
      type: String,
      required: [true, 'Trainer ID is required.'],
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

trainerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

trainerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if user is already exist!
trainerSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Trainer.findById(id);
  return existingUser;
};
export const Trainer = model<TTrainer, TrainerModel>('Trainer', trainerSchema);
