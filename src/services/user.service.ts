import { Document } from "mongodb";
import { UserType } from "../utils/interface";
import UserModel from "../models/user.model";

class User {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  async find({ userId, email }: UserType) {
    try {
      const profile =
        userId || email
          ? await UserModel.findOne({ $or: [{ _id: userId }, { email }] })
          : await UserModel.find();
      return profile;
    } catch (err) {
      console.error(err);
    }
  }

  async update(user: Document, payload: { [x: string]: UserType }) {
    try {
      for (const input in payload) {
        user[input] = payload[input] || user[input];
      }

      await user.save();

      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async create({ firstName, lastName, email, password }: UserType) {
    try {
      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password,
      });

      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async remove({ userId, email }: UserType) {
    try {
      await UserModel.deleteOne({ $or: [{ _id: userId }, { email }] });
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
