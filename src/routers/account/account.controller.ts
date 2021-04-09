import { Request, Response } from "express";
//토큰 발급
import * as jwt from "jsonwebtoken";
//비밀번호 암호화
import * as bcrypt from "bcrypt-nodejs";

import User from "../../models/user";
import Activity from "../../models/useractivity";

import Send from "../../Module/send";

export const SignUp = async (req: Request, res: Response) => {
  const { id, pw, name, age, icon } = req.body;
  // console.log(id, pw, name, age, icon);
  User.findOne({ _id: id }, async (err, result) => {
    if (err) throw err;
    if (result) Send(res, 201, "동일한 아이디가 있습니다.");
    else {
      bcrypt.hash(pw, null, null, async (err, hash) => {
        if (err) throw err;
        const newuser = new User({
          _id: id,
          password: hash,
          name: name,
          icon: icon,
          age: age,
          admin: false,
        });
        const newActivity = new Activity({
          userId: id,
          point: 0,
          mkTip: 0,
        });
        newuser
          .save()
          .then((data) => {
            newActivity
              .save()
              .then((data) => {
                console.log("유저 활동 생성");
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
  User.findOne({ _id: id }, async (err, result) => {
    if (err) throw err;
    if (!result) Send(res, 200, "id is none");
    else {
      bcrypt.compare(pwd, result.password, async (err, value) => {
        if (value) {
          const token = jwt.sign({ id: result.id }, "secret-key", {
            expiresIn: 44640,
          });
          return res
            .status(200)
            .send({ state: true, result: "로그인이 되셨습니다.", token: token })
            .end();
        } else {
          Send(res, 201, "password is error");
        }
      });
    }
  });
};

export const Token = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return Send(res, 201, "인증실패.", false);
  }
  let decoded = jwt.verify(token, "secret-key");
  User.findOne({ _id: decoded.toString() }, (err, res) => {
    if (res) {
      if (res.admin) {
        return res
          .status(200)
          .send({ result: "인증성공", state: true, admin: true, data: res });
      } else {
        return res
          .status(200)
          .send({ result: "인증성공", state: true, data: res });
      }
    } else return Send(res, 201, "인증실패.", false);
  });
};
