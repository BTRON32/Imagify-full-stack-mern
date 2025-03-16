import React from 'react'
import { stepsData } from '../assets/assets'
import {motion} from "framer-motion"

const Steps = () => {
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}//when we will scroll the webpage(and come to steps section) and this component will come to view, then only animation starts
    viewport={{once:true}}
     className='flex flex-col items-center justify-center my-32'>
     {/* title */}
     {/* font weight is font-semibold */}
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-gray-600 mb-8'>Transform Words into Stunning Images</p>

{/* contains a steps */}
        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item,index)=>(//stepsdata from assets folder, pass individual item and index, it will return a div with img, in the next line to display individual item, opacity=20
            
                <div className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg' key={index} >
                {/* item.icon we will use this item because each object contains one property called icon */}
                    <img width={40} src={item.icon} alt="" />
                    <div>
                    {/* add steps title and steps description */}
                    {/* text size and font weight */}
                        <h2 className='text-xl font-medium'>{item.title}</h2>
                        {/* text-color */}
                        <p className='text-gray-500'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Steps//add in home page