import { model, Schema, Model, Document } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
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
