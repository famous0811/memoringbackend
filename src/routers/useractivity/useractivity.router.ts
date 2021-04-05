import { Request, Response } from "express";

import Useractivity from "src/models/useractivity";
import User from "src/models/user";
import Send from "src/Module/send";

export const GetPoints = async (req: Request, res: Response) => {
  const { addpoint, _id } = req.body;

  User.findById(_id, (err, user) => {
    if (err) throw err;
    if (!user) {
      //유저가 없다면 유저 활동도 없어야 한다

      return Send(res, 201, "user is undifind");
    } else {
      Useractivity.findById(_id, (err, activity) => {
        if (err) throw err;
        activity.point += addpoint;
      });
    }
  });
};
