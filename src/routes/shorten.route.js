import { Router } from "express";
import {shorten} from "../controllers/shorten.controller.js";
import {validador} from "../middlewares/logado.middlewares.js";

  const router = Router();

  router.post("/urls/shorten",validador, shorten);

  export default router;