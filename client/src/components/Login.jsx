import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {motion} from "framer-motion"
import axios from "axios"
import { toast } from 'react-toastify'

const Login = () => {

    const [state,setState]=useState('Login')
    const {setShowLogin,backendUrl,setToken,setUser}=useContext(AppContext)//get from context api
    
// now we will use setShowLogin to disable or hide the login form
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

     {/* now we have to pass name, email and password on our api to create an account, to login to existing account we have to pass only email and password */}
    const onSubmitHandler=async(e)=>{
        e.preventDefault()//prevent webpage from reloading whenever we submit the form
        try {
            if (state==='Login') {//check for state, then we will call login api and vice versa
                const {data}=await axios.post(backendUrl + '/api/user/login',//we will call login api, pass endpoint and provide email and password, store the response we get in a variable named data
                    {email,password})

                    if (data.success) {//we are successfully logged in
                        setToken(data.token)//get token from response and set token available in app context, we are getting token in response using login
                        setUser(data.user)//get user from context, user from the response
                        localStorage.setItem('token',data.token)//store token in browser's localstorage, key name="token", and provide token we are getting from response
                        setShowLogin(false)//to hide login form(login form will be hidden now) 
                        toast.success("User logged in successfully!")
                    }else{
                        toast.error(data.message)
                    }
            }else{//if state is sign up
                const {data}=await axios.post(backendUrl + '/api/user/register',//we will make api call to the register endpoint, send email, name and password, after this we will get response from data and we will check if response if true
                    {name,email,password})

                    if (data.success) {
                        setToken(data.token)//set token
                        setUser(data.user)//set user
                        localStorage.setItem('token',data.token)//set token in localstorage
                        setShowLogin(false)//set this to false to hide the registration to false
                         toast.success("User account created successfully!")
                    }else{
                        toast.error(data.message)//displayed in notification
                    }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    {/* we have to disable scroll whenever login form is open */}
    useEffect(()=>{
        document.body.style.overflow='hidden'

        return ()=>{
             document.body.style.overflow='unset'
        }
    },[])//whenever there will be change like mount and unmount of this login component, then it will hide overflow(disable scrolling and enable the scrolling)
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
    <motion.form onSubmit={onSubmitHandler}
     initial={{opacity:0.2,y:50}}
    transition={{duration:0.3}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
     className='relative bg-white p-10 rounded-xl text-slate-500'>
     {/* title-signin or signup */}
     {/* state variable */}
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        {/* text */}
        <p className='text-sm'>Welcome back! Please sign in to continue</p>


{/* in login form there should be no Full name field, there will be 2 input fields when we switch to login form */}
{/* whenever state is not login, then this div will be displayed */}
        {state!=='Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
        {/* icon */}
            <img width={20} className='outline-gray-200' src={assets.user_icon_1} alt="" />
            {/* input field */}
            {/* div for name input field, it will be visible whenever the state is signup or !login */}
            {/* link state with input fields, whenever we will enter anything in input field, then that data will be stored in this state variable */}
           
            <input onChange={e=>setName(e.target.value)} value={name} className='outline-none text-sm' type="text" placeholder='Full Name' required />
        </div>}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon} alt="" />
            <input onChange={e=>setEmail(e.target.value)} value={email} className='outline-none text-sm' type="email" placeholder='Email id' required />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={e=>setPassword(e.target.value)} value={password} className='outline-none text-sm' type="password" placeholder='Password' required />
        </div>

{/* click here if user forgot the password */}
        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

{/* if state is login, then we will add button text called Login, else if state is not Login, then we will add button text called create account */}
        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state==='Login'?'login':'create account'}</button>
{/* message to switch this form from Login to signup or vice versa, if you don't have account, there will be an link for signup  */}
{/* switch option to switch between login and signup form */}
{/* if state is Login, then display the message Sign up, else display second p tag after : */}
{/* in onclick, add setState(state) it will change state value */}
    {state==='Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign up</span></p>
        :
        
    <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>}
{/* if we already have an account there will be a link for login, we can change the form to login */}
{/* on click, it will hide the login form */}
{/* whenever we will click on cross icon, it should hide the form */}
{/* we have to disable scroll whenever login form is open */}
{/* now we will use setShowLogin to disable or hide the login form */}
    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />
    </motion.form>

    </div>
  )
}

export default Login
