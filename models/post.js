import { model, Schema } from "mongoose";

const post = new Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
})



const postSchema = model('Post', post);
export default postSchema
