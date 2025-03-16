import mongoose from "mongoose";
// creating schema and model for mongodb db so that we can store users and others info on mongodb db
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    creditBalance:{type:Number,default:5},

})

const userModel=mongoose.models.user || mongoose.model("user",userSchema)//it will create a model with name user, ut will search for existing model with name user, if user model already exists it will use that model, else it will create new user Model using the above schema

export default userModel    //to use in any other file(using this, we will create different api's and using this user can login/register/logout from this account) in controllers folder