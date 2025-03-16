
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const [user,setUser]=useState(null)//true=>user is logged in, null=>logout, later we will connect backend so we will get user status from our backend
    const [showLogin, setShowLogin]=useState(false)
    // we have to add token state variable so that we can store and get token in localstorage, in token variable we will store token generated from api so that we can enable the login and registration feature on app
    const [token,setToken]=useState(localStorage.getItem('token'))//key name="token", if there is any token available in browser localstorage, it will be stored in state variable

    const [credit,setCredit]=useState(false)
// link/connect backend api's with our frontend
    const backendUrl=import.meta.env.VITE_BACKEND_URL 
    const navigate=useNavigate()

    // to find credits using api
    const loadCreditsData=async()=>{
        try {
            const {data}=await axios.get(backendUrl + '/api/user/credits',{headers:{token}})//call credits api using get method and store response(data) in data variable, it is get method in userRoutes.jsx in the backend as well, provide backend url and concat endpoint, add headers provide token in one object

            if (data.success) {
                setCredit(data.credits)//set the credit, provide data.credits
                setUser(data.user)//set the user, provide data.user, user from the response
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }//it will load data in the api

    // generate image using prompt, for that we need to create a function that will call the imageGenerate api 
    const generateImage=async(prompt)=>{//take parameter prompt, to generate image we need prompt
        try {//make api call
            const {data}= await axios.post(backendUrl + '/api/image/generate-image',{prompt},{headers:{token}})//we will call image generate api that we have created in backend, send prompt amd also send token in object in the headers, store response in variable data
            if (data.success) {//if response data is true
                loadCreditsData()//load credit, after generating image it will again display available credits
                return data.resultImage//return resultimage that we are getting from api response
            }else{
                toast.error(data.message)//display error message we are getting from api response
                loadCreditsData()//call loadCreditsData
                if (data.creditBalance===0) {//if data.creditBalance is =0, then redirect to buyCredit page
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
     // we have to call generate image function whenever we will click on the button
    const logout=()=>{//user can logout from the account, pass in value object
        localStorage.removeItem('token')//to remove token from browser localstorage, it will remove item with keyname ="token"
        setToken('')//set token to ""
        setUser(null)//set user to null
    }

    useEffect(()=>{
        if (token) {//if token is available
            loadCreditsData()//pass it in value object
        }
    },[token])//whenever token will be changed, then this arrow function will be executed

    const value={//pass all variables and functions to be used in all other components
        user,setUser, showLogin, setShowLogin, backendUrl,token,setToken,credit,setCredit, loadCreditsData, logout, generateImage
    }

    return (//value from above
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider//used in main.jsx file
