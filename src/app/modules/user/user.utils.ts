import { User } from './user.model';

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `Admin-${incrementId}`;
  return incrementId;
};

// Trainer ID
export const findLastTrainerId = async () => {
  const lastTrainer = await User.findOne(
    {
      role: 'trainer',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastTrainer?.id ? lastTrainer.id : undefined;
};

export const generateTrainerId = async () => {
  let currentId = (0).toString();
  const lastTrainerId = await findLastTrainerId();

  if (lastTrainerId) {
    currentId = lastTrainerId.substring(8);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `Trainer-${incrementId}`;
  return incrementId;
};

// Trainee ID
export const findLastTraineeId = async () => {
  const lastTrainee = await User.findOne(
    {
      role: 'trainee',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastTrainee?.id ? lastTrainee.id : undefined;
};

export const generateTraineeId = async () => {
  let currentId = (0).toString();
  const lastTraineeId = await findLastTraineeId();

  if (lastTraineeId) {
    currentId = lastTraineeId.substring(8);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `Trainee-${incrementId}`;
  return incrementId;
};
