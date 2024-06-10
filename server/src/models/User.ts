import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
});

const User = model('User', UserSchema);

export default User;
