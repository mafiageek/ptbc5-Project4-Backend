import express from "express";
import { register, login, update } from "../controllers/auth.js";

const router = express.Router();

import { requireSignin, isAdmin } from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);
router.patch("/user/:id", update);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});
export default router;
