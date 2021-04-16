import { model, Schema, Model, Document } from "mongoose";

const tipSchema = new Schema({
  word: {
    type: Schema.Types.ObjectId,
    ref: "word",
    required: true,
  },
  text: {
    type: String,
    required: true,
    min: 1,
    max: 40,
  },
  img: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
});

export interface tipDocument extends Document {
  word: typeof Schema.Types.ObjectId;
  text: string;
  user: string;
  img?: string;
}

const Tip: Model<tipDocument> = model("tip", tipSchema);
export default Tip;
