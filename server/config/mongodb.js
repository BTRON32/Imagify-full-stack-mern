// now we have to connect our project with mongodb, so we can store users data in mongodb db
//  connect mongodb express db with express app, code to connect project with mongodb db
import mongoose from "mongoose";

const connectDB=async()=>{
// add an event 
    mongoose.connection.on('connected',()=>{//get connection event, whenever db will be connected, this function will be connected
        console.log('Database Connected'); //whenever db will be connected, this event will be executed and whenever this event will occur, this will display this message in terminal
        
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)//add db(project) name=imagify, provide mongodb connection uri from .env
}

export default connectDB//to be used in other files like server.js