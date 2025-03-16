import React from 'react'
import { assets } from '../assets/assets'
import {motion} from "framer-motion"

const Description = () => {//mount on Home page
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}//initial value
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    
     className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
     {/* title and small description */}
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
        <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>


{/* for medium screen we will add flex-row=>will be displayed side by side and for mobile and small screen it will be displayed vertically */}
        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        {/* add image on left side */}
            <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg' />
            <div>
            {/* add text on right side */}
            {/* add text in h2 tag */}
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
                {/* add description in p tag */}
                <p className='text-gray-600 mb-4'>Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
                <p className='text-gray-600'>Simply type in a text prompt, and our cutting-edge AI will generate high quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless! </p>
            </div>
        </div>
    </motion.div>
  )
}

export default Description//add description component in home page