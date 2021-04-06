import { Request, Response } from "express";

import Voca from "../../../models/voca";
import Send from "../../../Module/send";

export const MakeVoca = async (req: Request, res: Response) => {
  const { title, user, words } = req.body;

  const newvoca = new Voca({
    title: title,
    user: user,
    words: words,
    amount: words.length,
  });

  newvoca
    .save()
    .then(() => {
      return res.status(200).send({ status: "make voca" });
    })
    .catch((err) => {
      console.error(err);
      Send(res, 201, "voca save error");
    });
};

export const GetSomeVoca = async (req: Request, res: Response) => {
  const { title } = req.body;
  Voca.find({ title: title }, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "no voca");
    else {
      return res.status(200).send({ status: result });
    }
  });
};
export const GetAllVocas = async (req: Request, res: Response) => {
  return res.status(200).send({ status: Voca.find({}) });
};

export const fixedVocas = async (req: Request, res: Response) => {
  const { _id, words, title } = req.body;

  Voca.findOne({ _id: _id }, async (err, result) => {
    if (err) throw err;
    result.title = title;
    result.words = words;
    result.save();
    return res.status(200).send({ status: "fixed voca" });
  });
};
