import * as express from "express";
import {
  MakeVoca,
  GetSomeVoca,
  GetAllVocas,
  fixedVocas,
} from "./voca.controller";

const router = express.Router();

router.post("/makevoca", MakeVoca);

router.post("/getallvoca", GetAllVocas);

router.post("/getsomevoca", GetSomeVoca);

router.post("/fixedvoca", fixedVocas);

export default router;
