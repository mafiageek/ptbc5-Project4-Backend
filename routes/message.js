import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import { create, list, read, remove } from "../controllers/message.js";

router.post("/message", create);
router.get("/messages", list);
router.get("/message/:id", read);
router.delete("/message/:id", remove);
export default router;
