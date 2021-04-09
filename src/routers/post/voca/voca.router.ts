import * as express from "express";
import {
  MakeVoca,
  GetSomeVoca,
  GetAllVocas,
  FixedVocas,
  GetMyVocas,
} from "./voca.controller";

const router = express.Router();

router.post("/makevoca", MakeVoca);

router.post("/getallvoca", GetAllVocas);

router.post("/getsomevoca", GetSomeVoca);

router.post("/fixedvoca", FixedVocas);

router.post("/getmyvoca", GetMyVocas);

export default router;
