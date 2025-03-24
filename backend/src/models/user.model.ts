import { Schema, model } from 'mongoose';

interface IUser {
  fullName: string;
  email: string;
  passwordHash: string;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const UserModel = model<IUser>('User', UserSchema);

export default UserModel;