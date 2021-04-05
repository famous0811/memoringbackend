import * as express from "express";
import { GetPoints } from "./useractivity.router";

const router = express.Router();

router.post("/getpoint", GetPoints);
