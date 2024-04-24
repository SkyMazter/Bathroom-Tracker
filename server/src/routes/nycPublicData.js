import express from "express";
import { getPublicData } from "../controllers/nycPublicData.js";
const router = express.Router();

router.get("/all", getPublicData);

export default router;
