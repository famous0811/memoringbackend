import { Request, Response } from "express";
//토큰 발급
import * as jwt from "jsonwebtoken";
//비밀번호 암호화
import * as bcrypt from "bcrypt-nodejs";

import User from "../../models/user";
import Activity from "../../models/useractivity";

import Send from "../../Module/send";

export const SignUp = async (req: Request, res: Response) => {
  const { id, pw, name, age } = req.body;

  User.findById(id, async (err, result) => {
    if (err) throw err;
    if (result) Send(res, 201, "동일한 아이디가 있습니다.");
    else {
      bcrypt.hash(pw, null, null, async (err, hash) => {
        if (err) throw err;
        const newuser = new User({
          _id: id,
          password: hash,
          name: name,
          age: age,
        });
        const newActivity = new Activity({
          userId: id,
        });

        newuser
          .save()
          .then(() => {
            newActivity
              .save()
              .then(() => {
                return res
                  .status(200)
                  .send({ state: true, result: "회원가입" })
                  .end();
              })
              .catch((err) => {
                Send(res, 201, err);
              });
          })
          .catch((err) => {
            Send(res, 201, err);
          });
      });
    }
  });
};

export const Login = async (req, res) => {
  const { id, pwd } = req.body;

  User.findById(id, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "id is none");
    else {
      bcrypt.compare(pwd, result.password, async (err, value) => {
        if (err) throw err;
        if (value) {
          const token = jwt.sign({ id: result.id }, "secret-key", {
            expiresIn: 44640,
          });
          return res
            .status(200)
            .send({ state: true, result: "login", token: token })
            .end();
        } else {
          Send(res, 201, "password is error");
        }
      });
    }
  });
};

//todo
export const Token = async (req: Request, res: Response) => {
  const { token } = req.body;

  let decoded = jwt.verify(token, "secret-key");
  User.findById(decoded.toString(), (err, result) => {
    if (err) throw err;

    if (res) {
      if (result.admin) {
        return res.status(200).send({
          result: "certification",
          state: true,
          admin: true,
          data: result,
        });
      } else {
        return res
          .status(200)
          .send({ result: "certification", state: true, data: result });
      }
    } else return Send(res, 201, "failed certification", false);
  });
};

export const Resiveacount = async (req: Request, res: Response) => {
  const { token, pwd, icon, age, name } = req.body;
  let decoded = jwt.verify(token, "secret-key");

  User.findById(decoded.toString(), async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 201, "no user");
    else {
      bcrypt.compare(pwd, result.password, async (err, value) => {
        if (err) throw err;
        if (value) {
          result.icon = icon;
          result.age = age;
          result.name = name;
          result.save();
          return res
            .status(200)
            .send({ state: true, result: "update user data" });
        } else {
          Send(res, 201, "password is error");
        }
      });
    }
  });
};
