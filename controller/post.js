import { v2 as cloudinary } from "cloudinary";
import postSchema from "../models/post.js";
import * as dotenv from "dotenv";
dotenv.config()

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

class Controller {
    // Get All Posts
    async getPosts(req, res) {
        try {
            const allPosts = await postSchema.find({})
            res.status(200).json({ success: true, message: "All Posts", data: allPosts })
        } catch (error) {
            res.status(500).json({ success: false, message: error })
        }

    }
    // Create New Post
    async createPost(req, res) {
        try {
            const { name, prompt, photo } = req.body
            const photoUrl = await cloudinary.uploader.upload_large(photo)
            const newPost = await postSchema.create({
                name, prompt, photo: photoUrl.url
            })
            res.status(201).json({ success: true, message: "New Post", data: newPost })
        } catch (error) {
            res.status(500).json({ success: false, message: error })
        }
    }

r}
export default new Controller();
