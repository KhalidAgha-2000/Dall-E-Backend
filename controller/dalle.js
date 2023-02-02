import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config()
// OPEN-AI configuration
const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY })
const openai = new OpenAIApi(configuration)

class Controller {


    // Test Dall-E router
    test(req, res) {
        res.send('Hello from DALL-E')
    }

    // Generate Image
    async generateImage(req, res) {

        try {
            const { prompt } = req.body
            const aiResponse = await openai.createImage({
                prompt,
                n: 1,
                size: "1024x1024",
                // response_format: 'url'
            })

            const image = aiResponse.data.data[0].url

            res.status(200).json({ success: true, message: "New Image", photo: image })

        } catch (error) {
            res.status(500).json({ success: false, message: error })
        }
    }

}


export default new Controller();
