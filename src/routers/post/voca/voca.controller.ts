import { Request, Response } from "express";

import Voca from "../../../models/voca";
import Send from "../../../Module/send";

export const MakeVoca = async (req: Request, res: Response) => {
  const { title, user, words, subtitle, tips } = req.body;

  const newvoca = new Voca({
    title: title,
    subtitle: subtitle,
    amount: words.length,
    user: user,
    words: words,
    tips: tips,
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
    else return res.status(200).send({ status: result });
  });
};

export const GetAllVocas = async (req: Request, res: Response) => {
  return res.status(200).send({ status: Voca.find({}) });
};

export const GetMyVocas = async (req: Request, res: Response) => {
  const { id } = req.body;
  Voca.find({ user: id }, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "no vocas");
    else return res.status(200).send({ status: result });
  });
};

export const FixedVocas = async (req: Request, res: Response) => {
  const { _id, words, title } = req.body;
  Voca.findById(_id, async (err, result) => {
    if (err) throw err;
    result.title = title;
    result.words = words;
    result.save();
    return res.status(200).send({ status: "fixed voca" });
  });
};
