import { Router } from "express";
import {deletar} from "../controllers/deletar.controller.js";
import {validador} from "../middlewares/logado.middlewares.js";

  const router = Router();

  router.delete("/urls/:id",validador, deletar);

  export default router;    