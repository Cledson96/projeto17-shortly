import { Router } from "express";
import {shortuser} from "../controllers/shortuser.controller.js";
import {validador} from "../middlewares/logado.middlewares.js";

  const router = Router();

  router.get("/users/me",validador, shortuser);

  export default router;    