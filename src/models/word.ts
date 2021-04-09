import { model, Schema, Model, Document } from "mongoose";

const wordSchema = new Schema({
  text: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  mean: {
    type: String,
    required: true,
    min: 1,
    max: 80,
  },
});
export interface wordDocument extends Document {
  text: string;
  mean: string;
}

const Word: Model<wordDocument> = model("word", wordSchema);

export default Word;
