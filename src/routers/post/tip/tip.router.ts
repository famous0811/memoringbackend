import * as express from "express";
import { Maketip, fixedTip, getSomeTip } from "./tip.controller";

const router = express.Router();

router.post("/maketip", Maketip);
router.post("/fixedtip", fixedTip);
router.post("/getsometip", getSomeTip);

export default router;
