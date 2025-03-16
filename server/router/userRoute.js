import express from "express"
import { loginUser, paymentRazorpay, registerUser, userCredits, verifyRazorpay } from "../controllers/userController.js";// we need controller functions
import userAuth from "../middlewares/auth.js";

const userRouter=express.Router()//we need to create a router
// create endpoint and controller function at that endpoint
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/credits",userAuth,userCredits)//create api endpoint, now we can hit url /api/user/credits, it will return user's credit, to execute this userCredit controller function, we need userID and to get userId we need middleware, before the function add middleware(userAuth), add token in headers
userRouter.post("/pay-razor",userAuth,paymentRazorpay)//userAuth for user authentication-it will add(convert token to userId) user id from the token, add controller function, api endpoint for razor pay payment
userRouter.post("/verify-razor",verifyRazorpay)//endpoint and function

export default userRouter

//http://localhost:4000/api/user/register
//http://localhost:4000/api/user/login