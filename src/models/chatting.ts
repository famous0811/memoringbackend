import { model, Schema, Model, Document } from "mongoose";

const Chatschema = new Schema({
  tip: {
    type: Schema.Types.ObjectId,
    ref: "tip",
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    max: 30,
  },
  answer: [
    {
      type: Schema.Types.ObjectId,
      ref: "answer",
    },
  ],
});

export interface ChatDocument extends Document {
  tip: typeof Schema.Types.ObjectId;
  answer?: typeof Schema.Types.ObjectId;
  text: string;
  user: string;
}

const Chat: Model<ChatDocument> = model("chat", Chatschema);

export default Chat;
