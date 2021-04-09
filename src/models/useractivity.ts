import { model, Schema, Model, Document } from "mongoose";

const activitySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
    min: 0,
  },
  mkTip: {
    type: Number,
    required: true,
    min: 0,
  },
});

export interface ActivityDocument extends Document {
  point: number;
  mkTip: number;
}

const Activity: Model<ActivityDocument> = model("activity", activitySchema);
export default Activity;
