import express from "express"
import { getGeocodeAddress } from "../controllers/geocoding.js";

const router = express.Router();

router.get('/addr/:address',getGeocodeAddress);

export default router