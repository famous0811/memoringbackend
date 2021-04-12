import { Request, Response } from "express";

import Tip from "../../../models/tip";
import Word from "../../../models/word";
import Activity from "../../../models/useractivity";

import Send from "../../../Module/send";
function objectId() {
  // const os = require('os');
  // const crypto = require('crypto');
  const d1 = new Date();
  const secondInHex = (d1.getTime() / 1000).toString(16);
  // const machineId = crypto.createHash('md5').update(os.hostname()).digest('hex').slice(0, 6);
  const processId = process.pid.toString(16).slice(0, 4).padStart(4, "0");
  const counter = process.hrtime()[1].toString(16).slice(0, 6).padStart(6, "0");

  return secondInHex + processId + counter;
}
export const Maketip = async (req: Request, res: Response) => {
  const { word, text, user, img } = req.body;
  const tip = new Tip({
    word: {
      _id: objectId(),
      ...word,
    },
    text: text,
    user: user,
    img: img,
  });

  // Activity.findOne({ userId: user }, async (err, result) => {
  //   if (err) throw err;
  //   if (!result) {
  //     console.log("유저가 없는데 tip을 만들고 있다???");
  //   } else {
  //     result.mkTip += 1;
  //     result.save();
  //     console.log("유저 있음 ㅋ");
  //   }
  // });
  tip
    .save()
    .then((data) => {
      console.log(data);
      return res.status(200).send({ status: true });
    })
    .catch((err) => {
      console.log(err);
      Send(res, 201, err, false);
    });
};
export const GetAllTip = async (req: Request, res: Response) => {
  return res.status(200).send({ status: Tip.find({}) });
};
export const GetSomeTip = async (req: Request, res: Response) => {
  const { text } = req.body;
  Word.findOne({ text: text }, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "등록된 단어가 없습니다.");
    else {
      Tip.find({ word: result }, async (err, tresult) => {
        if (err) throw err;
        return res.status(200).send({ status: tresult });
      });
    }
  });
};

export const FixedTip = async (req: Request, res: Response) => {
  const { _id, text } = req.body; //tip text

  Tip.updateOne({ _id: _id }, { $set: { text: text } })
    .then(() => {
      return res.status(200).send({ status: "fixed" });
    })
    .catch((err) => {
      Send(res, 201, err);
    });
};

export const GetMyTips = async (req: Request, res: Response) => {
  const { id } = req.body;
  Tip.find({ user: id }, async (err, result) => {
    if (err) throw err;
    if (!result) return Send(res, 201, "no tips");
    else return res.status(200).send({ status: result });
  });
};
