import { model, Schema, Model, Document } from "mongoose";
import Word, { WordDocument } from "./word";
import User from "./user";
const vocaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: User.name,
  words: [Word],
});

export interface vocaDocument extends Document {
  title: string;
  amount: number;
  user: string;
  words: WordDocument[];
}
const voca: Model<vocaDocument> = model("voca", vocaSchema);
export default voca;
