import { Request, Response } from "express";
import { Schema } from "mongoose";
import Tip from "../../../models/tip";
import Word from "../../../models/word";
import Activity from "../../../models/useractivity";

import Send from "../../../Module/send";

const ObjectId = require("mongoose").Types.ObjectId;
const ObjectID = require("mongodb").ObjectID;

export const Maketip = async (req: Request, res: Response) => {
  const { word, text, user, img } = req.body;
  var objid: typeof ObjectID;

  //유저 activity에 tip만든수 증가
  Activity.findOne({ userId: user }, async (err, result) => {
    if (err) throw err;
    if (!result) {
      console.log("유저가 없는데 tip을 만들고 있다???");
      Send(res, 201, "no user activity");
    } else {
      result.mkTip += 1;
      result.save();
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
          return Send(res, 201, "word make error");
        });
    } else {
      objid = ObjectId(result._id);
      result.statustip += 1;
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
      return res.status(200).send({ status: true, result: "tip save success" });
    })
    .catch((err) => {
      console.error(err);
      Send(res, 201, err, false, "tip save fail");
    });
};

export const GetAllTip = async (req: Request, res: Response) => {
  Tip.find({}, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "not tips found");
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

      for (let [index, tip] of result.entries()) {
        Word.findById(tip.word, async (err, reses) => {
          if (err) throw err;
          if (reses) {
            tips.forEach((part, i) => {
              part.word = {
                text: reses.text,
                mean: reses.mean,
              };
            }, tips);
            if (index + 1 === tips.length) {
              return res
                .status(200)
                .send({ status: true, data: tips, result: "all tips" });
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
    if (!result) Send(res, 201, "word found failed");
    else {
      Tip.find({ word: result._id }, async (err, vaule) => {
        if (err) throw err;
        if (vaule) {
          return res.status(200).send({
            status: true,
            result: "sometips",
            data: vaule.map((data) => ({
              _id: data._id,
              text: data.text,
              img: data.img,
              user: data.user,
            })),
          });
        }
      });
    }
  });
};

export const FixedTip = async (req: Request, res: Response) => {
  const { _id, text, word, img } = req.body; //tip text
  var objid: typeof ObjectID;

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
          Send(res, 201, "word save failed");
        });
    } else {
      objid = ObjectId(result._id);
      result.statustip += 1;
      result.save();
    }
  });
  Tip.findById(_id, async (err, result) => {
    if (err) throw err;
    Word.findById(result.word, async (err, result) => {
      if (err) throw err;
      result.statustip -= 1;
      result.save();
    });
  });
  Tip.updateOne({ _id: _id }, { $set: { text: text, word: objid, img: img } })
    .then(() => {
      return res.status(200).send({ status: true, result: "tips fixed" });
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
    else {
      return res.status(200).send({
        status: true,
        result: "my tips",
        data: result.map((data) => ({
          _id: data._id,
          tip: data.text,
          src: data.img,
          word: Word.findById(data.id, async (err, result) => {
            if (err) throw err;
            return result.text;
          }),
          meaning: Word.findById(data.id, async (err, result) => {
            if (err) throw err;
            return result.mean;
          }),
          user: data.user,
        })),
      });
    }
  });
};
