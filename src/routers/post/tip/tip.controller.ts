import { Request, Response } from "express";

import Tip from "../../../models/tip";
import Word from "../../../models/word";
import Activity from "../../../models/useractivity";

import Send from "../../../Module/send";

export const Maketip = async (req: Request, res: Response) => {
  const { word, text, user } = req.body; //word에 text,mean포함

  const tip = new Tip({
    word: word,
    text: text,
    user: user,
  });
  Activity.findOne({ _id: user }, async (err, result) => {
    if (err) throw err;
    if (!result) {
      console.log("유저가 없는데 tip을 만들고 있다???");
    } else {
      result.mkTip += 1;
    }
  });
  tip
    .save()
    .then((data) => {
      return res.status(200).send({ status: true });
    })
    .catch((err) => {
      Send(res, 200, err, false);
    });
};
export const getAllTip = async (req: Request, res: Response) => {
  return res.status(200).send({ status: Tip.find({}) });
};
export const getSomeTip = async (req: Request, res: Response) => {
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

export const fixedTip = async (req: Request, res: Response) => {
  const { _id, text } = req.body; //tip text

  Tip.updateOne({ _id: _id }, { $set: { text: text } });
  return res.status(200).send({ state: true, result: "fixed" });
  // Tip.findOne({ _id: _id }, async (err, result) => {
  //   if (err) throw err;
  //   if (!result) Send(res, 201, "수정할 tip이 없습니다.");
  //   else {
  //     result.text = text;
  //     result.save();
  //     return res.status(200).send({ state: true, result: "fixed" });
  //   }
  // });
};
