import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Enter your first name"],
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Enter your last name"],
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    max: 50,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    unique: true,
  },
  password: {
    type: String,
    min: 5,
    max: 200,
  },
});

export default model("User", UserSchema);
