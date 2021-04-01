import * as express from "express";
import { Login, SignUp, Token } from "./account.controller";

const router = express.Router();

router.post("/token", Token);
router.post("/login", Login);
router.post("/signup", SignUp);

export default router;
