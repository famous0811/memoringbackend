import User from "src/models/user";
import { Request, Response } from "express";
import Send from "src/Module/send";

//토큰 발급
import * as jwt from "jsonwebtoken";
//비밀번호 암호화
import * as bcrypt from "bcrypt-nodejs";

export const SignUp = async (req: Request, res: Response) => {
  const { id, pw, name } = req.body;
  User.findOne({ _id: id }, async (err, result) => {
    if (err) throw err;
    if (result) Send(res, 200, "동일한 아이디가 있습니다.");
    else {
      bcrypt.hash(pw, null, null, async (err, hash) => {
        if (err) throw err;
        const newuser = new User({
          _id: id,
          password: hash,
          name: name,
          icon: "",
          admin: false,
        });
        newuser
          .save()
          .then((data) => {
            return res.status(200).send({ state: true, data }).end();
          })
          .catch((err) => {
            Send(res, 200, err);
          });
      });
    }
  });
};

export const Login = async (req: Request, res: Response) => {
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
          Send(res, 200, "password is error");
        }
      });
    }
  });
};

export const Token = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return Send(res, 200, "인증실패.", false);
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
    } else return Send(res, 200, "인증실패.", false);
  });
};
