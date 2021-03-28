import { model, Schema, Model, Document } from "mongoose";

const wordSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  mean: {
    type: String,
    required: true,
  },
});
export interface wordDocument extends Document {
  text: string;
  mean: string;
}

const Word: Model<wordDocument> = model("word", wordSchema);

export default Word;
