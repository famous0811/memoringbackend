import { Request, Response } from "express";

import Tip from "../../../models/tip";
import Word from "../../../models/word";
import Activity from "../../../models/useractivity";

import Send from "../../../Module/send";

export const Maketip = async (req: Request, res: Response) => {
  const { word, text, user, img } = req.body;
  const ObjectId = require("mongoose").Types.ObjectId;
  const ObjectID = require("mongodb").ObjectID;
  var objid: typeof ObjectID;
  Activity.findOne({ userId: user }, async (err, result) => {
    if (err) throw err;
    if (!result) {
      console.log("유저가 없는데 tip을 만들고 있다???");
    } else {
      result.mkTip += 1;
      result.save();
      // console.log("유저 있음 ㅋ");
    }
  });

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
          objid = ObjectId(data._id);
        })
        .catch((err) => {
          return Send(res, 201, err);
        });
    } else {
      objid = ObjectId(result._id);
      result.statustip++;
      result.save();
    }
  });

  const tip = new Tip({
    word: objid,
    text: text,
    user: user,
    img: img,
  });

  tip
    .save()
    .then(() => {
      return res.status(200).send({ status: true });
    })
    .catch((err) => {
      console.error(err);
      Send(res, 201, err, false);
    });
};

export const GetAllTip = async (req: Request, res: Response) => {
  Tip.find({}, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 200, "no tips");
    else {
      const tips = result.map((data) => ({
        word: {
          text: "",
          mean: "",
        },
        text: data.text,
        user: data.user,
        img: data.img,
      }));
      for (let i = 0; i < tips.length; i++) {
        Word.findById(result[i].word, async (err, result) => {
          if (err) throw err;
          if (result) {
            tips.forEach((part, i) => {
              part.word = {
                text: result.text,
                mean: result.mean,
              };
            }, tips);
            if (i + 1 === tips.length) {
              return res.status(200).send({ status: tips });
            }
          }
        });
      }
    }
  });
};
export const GetSomeTip = async (req: Request, res: Response) => {
  const { text } = req.body;
  Word.findOne({ text: text }, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "등록된 단어가 없습니다.");
    else {
      Tip.find({ word: result._id }, async (err, tresult) => {
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
