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
    },
  ],
  tips: [
    {
      type: Schema.Types.ObjectId,
      ref: "tip",
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

vocaSchema.path("words").validate(function (value: any) {
  // console.log(value.length)
  if (value.length > 80 && value.length < 0) {
    throw new Error("Assigned person's size can't be greater than 10!");
  }
});

const voca: Model<vocaDocument> = model("voca", vocaSchema);
export default voca;
