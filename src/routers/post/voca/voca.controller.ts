import { Request, Response } from "express";

import Voca from "src/models/voca";
import Send from "src/Module/send";

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
      Send(res, 200, "voca save error" + err);
    });
};

export const GetSomeVoca = async (req: Request, res: Response) => {
  const { title } = req.body;
  Voca.find({ title: title }, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 200, "no voca");
    else {
      return res.status(200).send({ status: result });
    }
  });
};
export const GetAllVocas = async (req: Request, res: Response) => {
  return res.status(200).send({ status: Voca.find({}) });
};
