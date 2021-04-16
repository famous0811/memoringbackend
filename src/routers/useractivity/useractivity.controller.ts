import { Request, Response } from "express";

import Useractivity from "../../models/useractivity";
import User from "../../models/user";
import Send from "../../Module/send";

export const SetPoints = async (req: Request, res: Response) => {
  const { point, _id } = req.body;

  User.findById(_id, (err, user) => {
    if (err) throw err;
    if (!user) {
      //유저가 없다면 유저 활동도 없어야 한다

      return Send(res, 201, "user is undifind");
    } else {
      Useractivity.updateOne({ _id: _id }, { $set: { point: point } })
        .then(() => {
          return res.status(200).send({ status: true, result: "set point" });
        })
        .catch((err) => {
          Send(res, 201, "set point error");
          // return res
          //   .status(201)
          //   .send({ status: true, result: "set point error" });
        });
    }
  });
};

export const GetPoints = async (req: Request, res: Response) => {
  const { _id } = req.body;
  Useractivity.findById(_id, (err, activity) => {
    if (err) throw err;
    if (!activity) Send(res, 201, "user is does not exist");
    return res
      .status(200)
      .send({ state: true, result: "user's point", data: activity.point })
      .end();
  });
};
