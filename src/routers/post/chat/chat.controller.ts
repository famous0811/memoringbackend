import { Request, Response } from "express";
import Send from "../../../Module/send";

import Chat from "../../../models/chatting";
import Answer from "../../../models/answer";

const ObjectId = require("mongoose").Types.ObjectId;
export const Chatting = async (req: Request, res: Response) => {
  const { id, text, tipid } = req.body;
  const newchat = new Chat({
    user: id,
    text: text,
    tip: ObjectId(tipid),
  });

  newchat
    .save()
    .then(() => {
      return res.status(200).send({ result: "save chatting" });
    })
    .catch((err) => {
      Send(res, 201, "tip save error");
    });
};

export const answerchat = async (req: Request, res: Response) => {
  const { id, text, chatid, tip } = req.body;

  const newchat = new Answer({
    userid: id,
    text: text,
    tip: ObjectId(tip),
  });
  newchat
    .save()
    .then((result) => {
      Chat.updateOne(
        { _id: chatid },
        { $set: { answer: ObjectId(result._id) } }
      );
      return res.status(200).send({ state: true, result: "save answerchat" });
    })
    .catch((err) => {
      Send(res, 201, "anwer save error");
    });
};

export const getchats = async (req: Request, res: Response) => {
  const { tipid } = req.body;
  const answer = [];
  Chat.findOne({ tip: tipid }, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "not chat data");

    for (let data in result.answer) {
      Answer.findById(data, async (err, res) => {
        if (err) throw err;
        answer.push(res);
      });
    }
    return res.status(200).send({
      state: true,
      data: { userid: result.userid, text: result.text, answer: answer },
      result: "chats",
    });
  });
};
