import { model, Schema, Model, Document } from "mongoose";
import { wordDocument } from "./word";
import { tipDocument } from "./tip";
const vocaSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 30,
  },
  subtitle: {
    type: String,
    required: true,
    max: 20,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
    max: 80,
  },
  user: {
    type: String,
    required: true,
  },
  words: [
    {
      type: Schema.Types.ObjectId,
      ref: "word",
      min: 1,
      max: 80,
    },
  ],
  tips: [
    {
      type: Schema.Types.ObjectId,
      ref: "tip",
      min: 1,
      max: 80,
    },
  ],
});

export interface vocaDocument extends Document {
  title: string;
  amount: number;
  user: string;
  words: wordDocument[];
  tips: tipDocument[];
}
const voca: Model<vocaDocument> = model("voca", vocaSchema);
export default voca;
