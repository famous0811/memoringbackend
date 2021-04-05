import * as express from "express";
import { SetPoints, GetPoints } from "./useractivity.router";

const router = express.Router();

router.post("/setpoint", SetPoints);
router.post("/getpoint", GetPoints);
