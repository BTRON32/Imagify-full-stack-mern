import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({
   userId:{type:String,required:true},
   plan:{type:String,required:true},
   amount:{type:Number,required:true},
   credits:{type:Number,required:true},
   payment:{type:Boolean,default:false},
   date:{type:Number},

})

const transactionModel=mongoose.models.transaction || mongoose.model("transaction",transactionSchema)//model name will be transaction, using the schema we are creating one transaction model, if it is not available it will create new model with name transaction using transactionSchema

export default transactionModel    //we can export this transaction model in any file and we can store data using this transaction model