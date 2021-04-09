import { model, Schema, Model, Document } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    min: 4,
    max: 16,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 8,
    max: 16,
  },
  icon: {
    type: String,
    required: true,
    default: "basic",
  },
  name: {
    type: String,
    required: true,
    min: 1,
    max: 10,
  },
  age: {
    type: Number,
    required: true,
    min: 13,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export interface userDocument extends Document {
  id: string;
  password: string;
  name: string;
  age: number;
  admin: boolean;
}
const User: Model<userDocument> = model("user", userSchema);
export default User;
