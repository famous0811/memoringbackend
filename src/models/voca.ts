import { model, Schema, Model, Document } from "mongoose";
import { wordDocument } from "./word";
const vocaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  words: [
    {
      text: {
        type: String,
        required: true,
      },
      mean: {
        type: String,
        required: true,
      },
    },
  ],
});

export interface vocaDocument extends Document {
  title: string;
  amount: number;
  user: string;
  words: wordDocument[];
}
const voca: Model<vocaDocument> = model("voca", vocaSchema);
export default voca;
