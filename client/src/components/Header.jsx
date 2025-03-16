import React, { useContext } from 'react'
import { assets } from '../assets/assets'
// import { motion } from "motion/react"
import {delay, motion} from "framer-motion"
import { AppContext } from '../context/AppContext'
import {useNavigate} from "react-router-dom"

const Header = () => {

    const {user,setShowLogin}=useContext(AppContext)
    const navigate=useNavigate()

    const onClickHandler=()=>{//if user is already logged in, it will redirect us to the result page, if user is not logged in, then it will open a login form
        if(user){//if user is logged in
            navigate("/result")
        }else{//if user is not logged in, it will open login form
            setShowLogin(true)
        }
    }

    
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20 '
        initial={{opacity:0.2,y:100}}//initial values of component, opacity will be less and movied in y axis
        transition={{duration:1}}//after 1s
        whileInView={{opacity:1,y:0}}//suppose the component is not visible, when we scroll the webpage, component becomes visible, it will be visible clearly (e have added opacity 1 and it will come backt o original position(as we have added y:0))
        viewport={{once:true}}//repeat the above once
    >
        
            <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
            initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{delay:0.2,duration:0.8}}
            >
                <p>Best text to image generator</p>
                <img src={assets.star_icon} alt="" />
            </motion.div>
{/* different text size for small screen */}
            <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.4,duration:2}}//we have delay in animation
            
            >image</span>, in seconds.</motion.h1>

            <motion.p className='text-center max-w-xl mx-auto mt-5'
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}//come to original position from y:20 to y:0
            transition={{delay:0.6,duration:0.8}}
            >Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</motion.p>
            <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
            whileHover={{scale:1.05}}//increase size on hover and tap on the button
            whileTap={{scale:0.95}}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{default:{duration:0.5},opacity:{delay:0.8, duration:1}}}
            >Generate Images
            <img className='h-6' src={assets.star_group} alt="" />
            </motion.button>

{/* display multiple images, so we will use one array */}
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1,duration:1}}
            // to align all images side by side
             className='flex flex-wrap justify-center mt-16 gap-3'>
             {/* array length will be 6 */}
                {Array(6).fill('').map((item,index)=>(//pass individual item and index
                    <motion.img
                    whileHover={{scale:1.05,duration:0.1}}//while hover, increase size to 1.5 and also add duration
                    // if index is even, display sample_img_2 else display sample_img_1
                    // whenever we hover, it should increase the size so we will use scale-105
                     className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' key={index} width={70} src={index%2===0 ? assets.sample_img_2 : assets.sample_img_1} />
                ))}
            </motion.div>

            <motion.p

            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1.2,duration:0.8}}
             className='mt-2 text-neutral-600'>Generated images from imagify</motion.p>
        </motion.div>
   
  )
}

export default Header