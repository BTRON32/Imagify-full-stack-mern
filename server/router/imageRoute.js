import express from "express"
import {generateImage} from "../controllers/imageController.js"
import userAuth from "../middlewares/auth.js"

const imageRouter=express.Router()//create a router
// in router provide path and controller function so we can create api endpoint
imageRouter.post("/generate-image",userAuth,generateImage)//provide path, add generateImage controller function, here we need userId from body, here we will provide userId using middleware(userAuth-it will add userId in body and after that execute generateImage controller function)

export default imageRouter//export this to be used in server.js