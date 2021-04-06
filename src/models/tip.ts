import { model, Schema, Model, Document } from "mongoose";
import user from "./user";
import { wordDocument } from "./word";

const tipSchema = new Schema({
  word: {
    text: {
      type: String,
      required: true,
    },
    mean: {
      type: String,
      required: true,
    },
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

export interface tipDocument extends Document {
  word: wordDocument;
  text: string;
  user: string;
}

const tip: Model<tipDocument> = model("tip", tipSchema);
export default tip;
