import { model, Schema, Model, Document } from "mongoose";
import { wordDocument } from "./word";

const tipSchema = new Schema({
  word: {
    type: Schema.Types.ObjectId,
    ref: "word",
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
  word: wordDocument;
  text: string;
  user: string;
  img?: string;
}

const tip: Model<tipDocument> = model("tip", tipSchema);
export default tip;
