import express from 'express';
import controller from "../controller/post.js";

const router = express.Router()


router.get('/all-posts', controller.getPosts)
router.post('/create-post', controller.createPost)
 


export default router