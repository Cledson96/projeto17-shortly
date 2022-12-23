import { Router } from "express";
import {signin} from "../controllers/signin.controller.js";

  const router = Router();

  router.post("/signin", signin);

  export default router;