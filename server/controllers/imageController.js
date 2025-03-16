import axios from "axios";
import userModel from "../models/userModel.js";//add .js
import FormData from "form-data"

// api to generate image using prompt
export const generateImage=async(req,res)=>{
    try {//logic to generate image using prompt
        const {userId,prompt}=req.body//get userId and prompt from req.body, in body we will send prompt, we will send userId from token, token will be coverted into userId using the middleware and that will be added in body
        const user=await userModel.findById(userId)//find user using userId

        if(!user || !prompt){//if user is not available or prompt is not available
            return res.json({success:false,message:"Missing Details"})//return a response
        }

        if(user.creditBalance===0 || userModel.creditBalance<0){//check user's balance
            return res.json({success:false,message:"No Credit Balance",creditBalance:user.creditBalance})//send a reponse, we cannot generate Image is balance is 0 or less than that, send creditBalance using user.creditBalance
        }    
        //if balance is greater than0, then we have to generate image using api provided by clipdrop
        //create mutipart form data that we will send in api req
        const formData=new FormData()
        formData.append('prompt',prompt)//append the prompt in formData, we will get prompt from req.body defined on top

        // to generate image using prompt use the below url
            //send form data in the api
            // in data we will store response, we will get data as array buffer, using that buffer we need to convert image to base 64 image
        const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{//provide api endpoint and add formdata and add headers
            headers: {//in req, we have to send headers and in headers, we have to send x-api-key(api key we have added in env variable)
                'x-api-key': process.env.CLIPDROP_API,//api key from env variable
              },
              responseType:'arraybuffer'//response type
        })
        // in data we will store response, we will get data as array buffer, using that buffer we need to convert image to base 64 image


        const base64Image=Buffer.from(data,'binary').toString('base64')//provide data and provide binary and make it as a string and provide base64
        //using base64 image,we need to generate imageUrl
        const resultImage=`data:image/png;base64,${base64Image}`//base64image from top
        //deduct userCredit
        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})//provide userId and provide credit Balance, in credit Balance we have to deduct credit balance by 1, user'r credit balance will be reduced by 1
        // send resultImage in response
        res.json({success:true,message:"Image Generated",creditBalance:user.creditBalance-1, resultImage})//send result image also in response
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
//now we have created an api to generate an image
// export {generateImage}