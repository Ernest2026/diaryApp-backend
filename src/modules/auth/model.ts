import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Enter fullname'],
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: [true, 'Enter your email'],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Enter your password'],
      min: 5,
      max: 200,
    },
    imageUrl: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true
    },
    entriesId: {
      type: Schema.Types.ObjectId,
    },
    settingId: {
      type: Schema.Types.ObjectId
    }
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

export default model('User', UserSchema);
