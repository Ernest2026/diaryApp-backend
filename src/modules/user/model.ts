import { IUserDb } from '../../types/dbmodel';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema<IUserDb>(
  {
    fullname: {
      type: String,
      required: [true, 'Enter fullname'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Enter your email'],
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Enter your password'],
      minlength: 5,
      maxlength: 200,
      select: false, // 👈 key fix
    },
    imageUrl: {
      type: String,
    },
    entriesId: {
      type: Schema.Types.ObjectId,
    },
    settingId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,      // 👈 handles createdAt + updatedAt correctly
    versionKey: false,     // 👈 removes __v safely
    toJSON: {
      transform(_, ret) {
        return ret;         // 👈 no deletes, no TS issues
      },
    },
  }
);

const UserModel = model<IUserDb>('User', UserSchema);
export default UserModel;
