// find userId using jwt
import jwt from "jsonwebtoken"

const userAuth=async(req,res,next)=>{//cb function, middleware will be executed before controller function whenever we will hit api
    const  {token}=req.headers//find token from req.headers, in the header, token will be added and we will find token in this middleware

    // from this token we have to find userId
    if(!token){//if token is not available
        return res.json({success:false,message:"Not Authorized. Login Again"})//generate one response
    }
    //if token is available
    try {//provide token from headers and verify it with secret key stored in .env, now we have decoded token and in this we will have one id, because we have created token using id, so from decoded token we will find id
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)//provide token we are getting from headers and verify it with secret key we have provided in .env folder

        if(tokenDecode.id){//from this token, we need to get user's Id, if id is available, because we have created token with an id
            req.body.userId=tokenDecode.id//if id is available, we will attach this id in req.body with userId property, in userId provide tokenDecode.id, user id will be added in req.body
        }else{//if this id is not available
            return res.json({success:false,message:"Not Authorized. Login Again"})//return a response
        }

        next()//it will execute controller function that will return user's credit, call next method
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default userAuth//it will find user id from token and add id in req.body, to be used in userRoutes