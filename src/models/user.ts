import mongoose, { Model } from 'mongoose';
import { User } from '../ts/interface/user';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

userSchema.index({ email: 1 }); // Index on email field

const UserModel: Model<User> = mongoose.model<User>('User', userSchema);

export default UserModel;
