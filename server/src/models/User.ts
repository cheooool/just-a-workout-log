import mongoose from 'mongoose';

/**
 * Interface: User Model
 */
export interface IUser {
  username: string;
  password: string;
}
const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>('user', UserSchema);

export default UserModel;
