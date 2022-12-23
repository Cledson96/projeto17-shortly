import { Router } from "express";
import {urls} from "../controllers/urls.controller.js";

  const router = Router();

  router.get("/urls/:id", urls);

  export default router;