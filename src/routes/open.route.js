import { Router } from "express";
import {open} from "../controllers/open.controller.js";

  const router = Router();

  router.get("/urls/open/:shortUrl", open);

  export default router;    