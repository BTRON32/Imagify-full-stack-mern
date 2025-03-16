import React, { useContext } from 'react'
import {assets} from "../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const {user, setShowLogin, logout, credit}=useContext(AppContext)//getting user, setShowlogin, logout and credit from context api
    // const [user,setUser]=useState(true)//true=>user is logged in, null=>logout
   
    const navigate=useNavigate()
  return (
    // align content side by side, for this use flex (layout) and add remaining properties, now we will see logo in left side and pricing and login on right side
    <div className='flex items-center justify-between py-4'>
    {/* adding logo, w-28, different width for small and large device */}
    {/* whenever we will click on logo, we will be redirected to home page, for this we will add Link tag */}
        <Link to='/'><img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' /></Link>


        <div>
        {/* check if user is logged in or not */}
        {/* if user is available, then display this div */}
        {user ? 
            <div className='flex items-center gap-2 sm:gap-3'>
            {/* navigate to buycredit page */}
                <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                    <img className='w-5' src={assets.credit_star} alt="" />
                    {/* adding text in this button */}
                    <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : {credit}</p>
                </button>
                {/* add users name after login */}
                {/* it will be hidden for small screen */}
                {/* get name from user state */}
                <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
                    {/* on hover, it will display logout */}
                    {/* the below group will be hidden by default and on hover it will be visible again */}
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                    {/* provide logout function from appcontext */}
                        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                    </ul>

                    </div>
                </div>
            </div>
            ://if user is logged out, then display this div
            //add flex, increase gap for small devide, gap between the text
            <div className='flex items-center gap-2 sm:gap-5'>
            {/* add click feature, so that whenever we will click here it will open buycredit page */}
                <p onClick={()=>navigate("/buy")} className='cursor-pointer'>Pricing</p>
                {/* add bgColor, padding from x and y axis and add different padding for small screen */}
                {/* add click functionality that will make setShowLogin state true, so login component is visible */}
                <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full '>Login</button>
            </div>
        }
           
           
           
        </div>
    </div>
  )
}

export default Navbar