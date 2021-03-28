import { model, Schema, Model, Document } from "mongoose";
import user from "./user";
import word, { wordDocument } from "./word";

const tipSchema = new Schema({
  word: word,
  text: {
    type: String,
    required: true,
  },
  user: user.name,
});

export interface tipDocument extends Document {
  word: wordDocument;
  text: string;
  user: string;
}

const tip: Model<tipDocument> = model("tip", tipSchema);
export default tip;
