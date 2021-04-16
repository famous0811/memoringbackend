import { model, Schema, Model, Document } from "mongoose";

const Chatschema = new Schema({
  text: {
    type: String,
    request: true,
    max: 30,
  },
  userId: {
    type: String,
    request: true,
  },
});

export interface answerDocument extends Document {
  text: string;
  uerId: string;
  chat: typeof Schema.Types.ObjectId;
}

const Answer: Model<answerDocument> = model("answer", Chatschema);

export default Answer;
