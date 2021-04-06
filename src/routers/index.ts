import * as express from "express";
import Account from "./account/account.router";
import Useractivity from "./useractivity/useractivity.router";
import Tip from "./post/tip/tip.router";
import Voca from "./post/voca/voca.router";

const router = express.Router();

router.use("/account", Account);
router.use("/useractivity", Useractivity);
router.use("/tip", Tip);
router.use("/voca", Voca);

export default router;
