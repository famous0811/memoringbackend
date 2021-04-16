import { Request, Response } from "express";

import Voca from "../../../models/voca";
import Word from "../../../models/word";
import Tip from "../../../models/tip";
import Send from "../../../Module/send";

const ObjectId = require("mongoose").Types.ObjectId;
const ObjectID = require("mongodb").ObjectID;

export const MakeVoca = async (req: Request, res: Response) => {
  const { title, user, words, subtitle, tips } = req.body;

  var wordarry: typeof ObjectID[];

  for (const word of words) {
    Word.findOne({ text: word.text }, async (err, result) => {
      if (err) throw err;
      if (!result) {
        const newword = new Word({
          ...word,
          statustip: 1,
        });
        newword
          .save()
          .then((data) => {
            wordarry.push(ObjectId(data._id));
          })
          .catch((err) => {
            return Send(res, 201, "word save failed");
          });
      } else {
        wordarry.push(ObjectId(result._id));
      }
    });
  }
  const newvoca = new Voca({
    title: title,
    subtitle: subtitle,
    amount: words.length,
    user: user,
    words: wordarry,
    tips: tips.map((data) => ObjectId(data._id)),
  });

  newvoca
    .save()
    .then(() => {
      return res.status(200).send({ status: true, result: "make voca" });
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
      return res.status(200).send({
        status: true,
        result: "some voca",
        data: result.map(({ title, subtitle, amount, user }) => ({
          title,
          subtitle,
          amount,
          user,
        })),
      });
    }
  });
};

export const GetAllVocas = async (req: Request, res: Response) => {
  return res.status(200).send({
    status: Voca.find({}, async (err, result) => {
      if (err) throw err;
      if (!result) Send(res, 201, "not vocas found");
      else {
        return res.status(200).send({
          status: true,
          result: "all vocas",
          data: result.map(({ title, subtitle, amount, user }) => ({
            title,
            subtitle,
            amount,
            user,
          })),
        });
      }
    }),
  });
};

export const GetMyVocas = async (req: Request, res: Response) => {
  const { id } = req.body;
  Voca.find({ user: id }, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "no vocas");
    else
      return res.status(200).send({
        status: true,
        result: "my voca",
        data: result.map(({ title, subtitle, amount, user }) => ({
          title,
          subtitle,
          amount,
          user,
        })),
      });
  });
};

export const FixedVocas = async (req: Request, res: Response) => {
  const { _id, words, title, subtitle, tips } = req.body;
  var wordarry: typeof ObjectID[];

  for (const word of words) {
    Word.findOne({ text: word.text }, async (err, result) => {
      if (err) throw err;
      if (!result) {
        const newword = new Word({
          ...word,
          statustip: 1,
        });
        newword
          .save()
          .then((data) => {
            wordarry.push(ObjectId(data._id));
          })
          .catch((err) => {
            return Send(res, 201, err);
          });
      } else {
        wordarry.push(ObjectId(result._id));
      }
    });
  }

  Voca.updateOne(
    { _id: _id },
    {
      $set: {
        title: title,
        subtitle: subtitle,
        tips: tips.map((data) => ObjectId(data._id)),
        amount: words.length,
        words: wordarry,
      },
    }
  )
    .then(() => {
      res.status(200).send({ status: true, result: "fixedvoca" });
    })
    .catch((err) => {
      Send(res, 201, "fial fexed voca");
    });
};

export const DetailVocas = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const tips: any[] = [];
  const words: any[] = [];
  Voca.findById(_id, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "no voca");
    else {
      for (const tip of result.tips) {
        Tip.findById(tip, async (err, res) => {
          if (err) throw err;
          if (res)
            tips.push({
              id: res._id,
              word: res.word,
              text: res.text,
              img: res.img,
              user: res.user,
            });
        });
      }
      for (const word of result.words) {
        Word.findById(word, async (err, res) => {
          if (err) throw err;
          if (res) words.push({ id: res._id, text: res.text, mean: res.mean });
        });
      }

      return res.status(200).send({
        status: true,
        result: "details",
        data: result.map(({ title, subtitle, amount, user }, index) => ({
          title,
          subtitle,
          amount,
          user,
          word: words[index],
          tip: tips[index],
        })),
      });
    }
  });
};
