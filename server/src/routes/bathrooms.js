import express from "express"
import { getAllBathrooms } from "../controllers/bathrooms.js"

const router = express.Router();

router.get('/all',getAllBathrooms);

export default router