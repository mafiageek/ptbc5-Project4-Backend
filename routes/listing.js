import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares/auth.js";

import { create, list, read, remove, update } from "../controllers/listing.js";

router.post("/listing", requireSignin, formidable(), create);
router.get("/listings", list);
router.get("/listing/:id", read);
router.delete("/listing/:id", requireSignin, remove);
router.put("/listing/:id", requireSignin, formidable(), update);
export default router;
