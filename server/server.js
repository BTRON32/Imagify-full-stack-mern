import express from "express"
// create a simple express app
import cors from "cors"//allow us to connect backend server with frontend
import 'dotenv/config'//using that we can create .env file and use it in backend server
import connectDB from "./config/mongodb.js"//add complete path with complete extension(add .js)
import userRouter from "./router/userRoute.js"
import imageRouter from "./router/imageRoute.js"
// nodemon-using this it will restart backend server whenever we will make any changes in  code file
//json web token//to add authentication in our project
//mongoose-using this we will connect backend server with mongodb db
//axios-to make api calls
//bcrypt-to encrypt the password
//razorpay-online payment gateway

const PORT=process.env.PORT || 4000//if PORT number is available is available in env, it will use port number from there, else it will use PORT 4000
const app=express()//create app using express
// now we have to add functionality to login and register user on app and also add functionality to generate images using AI using backend
//remove test script from package.json, to use import statement, next to main in add "type":"module" in package.json
// middleware
app.use(express.json())//all request will be passed using json method
app.use(cors())//use cors in express app
await connectDB()//call the function, it will connect our express app with mongodb db

app.use("/api/user",userRouter)//add path and at this path we will add Router(from userRouter.js), whenever we will type backend url(localhost:4000), then /api/user/register will hit register api endpoint
app.use("/api/image",imageRouter)//api endpoint and imageRouter function, to test this /api/image/generate-image and in body provide prompt in json and in headers provide token 

app.get("/",(req,res)=>{//path and function, pass req, res as parameters
    res.send("API Working")//return a response(send one message), whenever we will hit this path on backend, it will send one message as api working
})
// now we have to connect our project with mongodb, so we can store users data in mongodb db
app.listen(PORT,()=>{//to start express app, provide port and add a arrow function which will return a message which will be displayed in terminal, add port number
    console.log('Server is running on port '+PORT);//simple express app is working at this url, the backend url is http://localhost:4000
    // whenever we will make changes, we have to stop and start backend server, to solve this we will add in scripts after start "server":"nodemon server.js" in package.js
})

//localhost:4000/api/user/register-this endpoint will execute registerUser controller function -send name, email and password in json body, it will be added in db
//localhost:4000/api/user/login-this endpoint will execute loginUser controller function  that will allow us to login-send email and password in json body, it will be added in db
