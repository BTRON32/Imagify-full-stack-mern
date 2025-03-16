import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"//to encrypt the password
import jwt from "jsonwebtoken"//create a token for user authentication
import razorpay from "razorpay"
import transactionModel from "../models/transactionModel.js";

const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body//find(to create an account we need) name, email id and password and we will get all these info from req. body

        if(!name || !email || !password){//if name/email/password is available or not
            return res.json({success:false,message:"Missing Details"})//return a response
        }
        // if all 3 of these are available
        // encrypt password given by the user
        // add a salt
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password, salt)//provide the password(that user has provided in body) and salt created above

        const userData={//object where we will store all users data that will be stored in db
            name,//available in body
            email,//available in body
            password:hashedPassword//store encrypted/saved password
        }
        // save these user data in mongodb db
        const newUser=new userModel(userData)//provide this data mentioned above and by default credit balance 5 will be added in new user
        const user=await newUser.save()//save user in db, it will save a new user in db

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)//generate one token that will be sent in response, so that we can enable the login and registration in the frontend, use jwt.sign method and add id (we will get id from user, whenever is created in db, it will automatically create one id with property of _id and also add secret key declared in .env file) 

        res.json({success:true,token,user:{name:user.name}})//send token in response, send user and in this user property we will add name only
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
} 

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body//we need only email and password from req.body
        const user=await userModel.findOne({email})//find user using email id as it is unique, to find user we are going to use the user model, it will find user with email id provided by user from req.body

        if(!user){//if user is not available with this email id
            return res.json({success:false,message:"User does not exist"})//generate a response
        }

        //user is available
        const isMatch=await bcrypt.compare(password,user.password)//password provided in request and password saved in db for this user

        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)//generate a token and send this token in response, using id stored in user and secret

            res.json({success:true,token,user:{name:user.name}})//generate a response with success:true
        }else{
            return res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const userCredits=async(req,res)=>{// next create api for userCredit
    try {
        const {userId}=req.body//we need userId to get credit of particular user, that we will get from req.body, we will not send userId from req.body instead we will add one middleware that will find userId from token and that will add userId in body, we need userId in the body, we will provide this using middleware(in auth.js in middlewares folder)
        const user=await userModel.findById(userId)//find user using userId, find user from userModel, provide userId from above line
        res.json({success:true, credits:user.creditBalance,user:{name:user.name}})//return a response, in credits property we will add the user from above line and add .creditBalance(from userModel we have added a property called creditBalance), we will also send user's name in this response, name will be user's name
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// add payment gateway on app, so we can purchase more credit to generate images
//to initialise payment gateway
// store razorpay key id and key secret
// INR because we have set razor pay account in India       

const razorpayInstance=new razorpay({//initialise razorpay, create a new razorpay Instance
    key_id:process.env.RAZORPAY_KEY_ID,//provide keyid and secret key from env variable
    key_secret:process.env.RAZORPAY_KEY_SECRET,
}) 

//controller function to make razor pay payment
const paymentRazorpay=async(req,res)=>{
    try {
        const {userId,planId}=req.body//we need userId and plan Id for making razorpay payment, we will get this from req.body

        const userData=await userModel.findById(userId)//find user using userId

        if (!userId || !planId) {//if user data or plan id is available or not, if user is not available or plan id is not available
            return res.json({success:false,message:"Missing Details"})//add a response
        }

        // we have userId and planId also, we will create some variables, in any transaction, we will store credit, planname or planid, amount and date
        let credits,plan, amount, date

        switch (planId) {//to get a plan from 3 different plans, getting planid from req.body, based on plan Id, we will add different plan,credit and amount
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;
            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;
            case 'Business':
                plan='Business'
                credits=5000
                amount=250
                break;
            
            default:
                return res.json({success:false,message:"Plan not found"})//add a response
                break;
        }//now we have credit, amount and plan for transaction
        date=Date.now()//to get date, it will store current date time stamp

        // using these variables, we need to create one object that will store all transaction data
        const transactionData={
            userId, plan, amount, credits,date//in the object we will store userId, plan, amount, credits and date
        }

        // store transaction data in mongodb db, we need to create one model(transacionmodel.js)
        const newTransaction=await transactionModel.create(transactionData)//use it to store data in db, store transactiondata in mongodb db

        const options={//create options
            amount:amount*100,//from variable amount
            currency:process.env.CURRENCY,
            receipt:newTransaction._id,//add unique id, whenever transaction will be created and stored in db, in this transaction data an id will be created by mongodb, we will use that id in this receipt
        }

        // create order using razorpay
        await razorpayInstance.orders.create(options, (error, order)=>{//options will be used to create orders using razorpay instance, here we will get errors or orders
            if (error) {//if any error occurs while creating order
                console.log(error);
                res.json({success:false,message:error})//add a response
                
            }
            //if order is created, then we will get order in the above parameter
            res.json({success:true,order})//send order
        })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

// to verify razor pay payment
const verifyRazorpay=async(req,res)=>{
    try {
        const {razorpay_order_id}=req.body//find razor pay order id from razor pay payment response from req.body
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)//razorPay instance, we will add orders.fetch and provide order id in fetch

        if(orderInfo.status==='paid'){//check status of order from orderInfo 
            const transactionData=await transactionModel.findById(orderInfo.receipt)//find transaction data for this order, we have to provide orderInfo.receipt, in receipt we have added new transaction id, to find transaction data we are using transactio model and in this we are using find by id method and in this we are providing the orderInfo.receipt
        

        if (transactionData.payment) {//if it is true, it means payment is already verified
            return res.json({success:false,message:"Payment Failed"})//return a  response
        }

        //add credit in user's account or user's data

        const userData=await userModel.findById(transactionData.userId)//find user data using user model, provide transaction data.userId, we will find user's data
        const creditBalance=userData.creditBalance+transactionData.credits//find credit balance and we will add credit, it is current available credit balance of the user+ credits purchased using pricing plan
        await userModel.findByIdAndUpdate(userData._id, {creditBalance})//use user Model, find user using userData._id, update credit balance, new credit balance from above will be updated in the userData using this usermodel, now we have updated credit after purchase

        await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})//update payment status also, make it true after verification, we will make payment true

        res.json({success:true,message:"Credits Added"})//generate a response
    }else{
        res.json({success:false,message:"Payment Failed"})
    }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
//using this payment verification function, we will create api route 
export {loginUser, registerUser,userCredits, paymentRazorpay, verifyRazorpay}//export controller functions from here to be used in userRoute.js