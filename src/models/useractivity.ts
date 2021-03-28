import { model, Schema, Model, Document } from "mongoose";
import User from "./user";

const activitySchema = new Schema({
  point: {
    type: Number,
    required: true,
  },
  mkTip: {
    type: Number,
    required: true,
  },
});

export interface ActivityDocument extends Document {
  point: number;
  mkTip: number;
}

const Activity: Model<ActivityDocument> = model("activity", activitySchema);
export default Activity;
