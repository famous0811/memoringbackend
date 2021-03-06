import * as express from "express";
import { Login, SignUp, Token, Resiveacount } from "./account.controller";

const router = express.Router();

router.post("/token", Token);
router.post("/signin", Login);
router.post("/signup", SignUp);
router.post("/resive", Resiveacount);

export default router;
