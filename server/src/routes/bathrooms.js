import express from "express"
import { getAllBathrooms , setNewBathroom} from "../controllers/bathrooms.js"

const router = express.Router();

router.get('/all',getAllBathrooms);
router.post('/new',setNewBathroom)

export default router