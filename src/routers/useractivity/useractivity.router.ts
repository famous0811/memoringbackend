import * as express from "express";
import { SetPoints, GetPoints } from "./useractivity.controller";

const router = express.Router();

router.post("/setpoint", SetPoints);
router.post("/getpoint", GetPoints);

export default router;
