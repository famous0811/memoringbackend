import { model, Schema, Model, Document } from "mongoose";

const activitySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  mkTip: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  rank: {
    type: String,
    default: "bronze",
  },
});

export interface ActivityDocument extends Document {
  point: number;
  mkTip: number;
}

const Activity: Model<ActivityDocument> = model("activity", activitySchema);
export default Activity;
