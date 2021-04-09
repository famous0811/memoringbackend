import * as express from "express";
import {
  Maketip,
  FixedTip,
  GetSomeTip,
  GetAllTip,
  GetMyTips,
} from "./tip.controller";

const router = express.Router();

router.post("/maketip", Maketip);
router.post("/fixedtip", FixedTip);
router.post("/getsometip", GetSomeTip);
router.post("/getalltip", GetAllTip);
router.post("/getmytip", GetMyTips);

export default router;
