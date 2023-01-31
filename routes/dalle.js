import express from 'express';
import controller from "../controller/dalle.js";


const router = express.Router()

router.get('/', controller.test)
router.post('/generateImage', controller.generateImage)


export default router