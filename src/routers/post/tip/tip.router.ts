import * as express from "express";
import { Maketip, fixedTip, getSomeTip, getAllTip } from "./tip.controller";

const router = express.Router();

router.post("/maketip", Maketip);
router.post("/fixedtip", fixedTip);
router.post("/getsometip", getSomeTip);
router.post("/getalltip", getAllTip);

export default router;
