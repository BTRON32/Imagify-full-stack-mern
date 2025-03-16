import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import {AppContext} from '../context/AppContext'
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {

  const {user, backendUrl, loadCreditsData, token, setShowLogin}=useContext(AppContext)//url to make api call to our api endpoint and we also need token, setShowLogin, loadCreditsData and we need the user

  const navigate=useNavigate()
// add payment gateway on app, so we can purchase more credit to generate images
//function to initialise the payment
  const initPay=async(order)=>{//we need order
    const options={//create options
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,//add key from env variable
      amount:order.amount,//add order amount, we are getting order from the parameter above
      currency:order.currency,//add currency
      name:'Credits Payment',//add name, because we are buying credits
      description:'Credits Payment',
      order_id:order.id,//we need orderId, in this we will add order that we are getting from parameter and from this we will find id
      receipt:order.receipt,//receipt -we will get it from order.receipt
      handler:async(response)=>{//add a handler function, in this we will get response
        // console.log(response);
        // link payment verification api with our frontend
        try {
          const {data}=await axios.post(backendUrl + '/api/user/verify-razor',response,{headers:{token}})//make api call to razor pay verification api endpoint, concat api endpoint, we will add response in api request, provide headers and provide token
          if (data.success) {//check response
            loadCreditsData()//load credit
            navigate('/')//redirect user on homepage
            toast.success('Credit Added')
          }
        } catch (error) {
          toast.error(error.message)
        }
        
      }
      
    }
    const rzp=new window.Razorpay(options)//provide the options from above
    rzp.open()
  }
  

  // link endpoint with frontend
  // we have to create a function that will initialise payment on razorpay website

  const paymentRazorpay=async(planId)=>{//we need planId
    try {
      if (!user) {//if user is not available
        setShowLogin(true)//open login form
      }

      // if user is loggedin, we will make api call to razor pay api that we have created in our backend
      // we will get response from this api request in this data
      const {data}=await axios.post(backendUrl + '/api/user/pay-razor',{planId},{headers:{token}})//add backendurl and concat endpoint, send planId and token in object in the headers, middleware will get this token and find userId,middleware will get this token and find userId

      if (data.success) {//initialise the payment
        initPay(data.order)//add data.order because in response we will get order
      }

    } catch (error) {
      toast.error(error.message)//error in toast notification
    }
  }
  return (
    <motion.div
     initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    
     className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6 '>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item,index)=>(//plans from assets.js file. Pass individual item and index as parameters in map function
          <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500' key={index}>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'><span className='text-3xl font-medium'>${item.price} </span>/ {item.credits} credits</p>
            {/* if user is not logged in and clicks on this button, it should open login component, if user is already logged in, it should open display payment page*/}
            {/* if user is already logged in, then display button text called Purchase, if user is not logged in, then display text called getStarted, for this we need to get user here in buy credit page using useContext hook, if user is available, then display Purchsae, else display Get Started */}
            {/* link payment razor pay function with our button, when we click on payment button, this function will be executed, item.id will be plan id */}
            <button onClick={()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchase':'Get Started'}</button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit