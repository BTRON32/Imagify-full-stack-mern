import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from "framer-motion"

const Testimonials = () => {//mount in Home page
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{omce:true}}
     className='flex flex-col items-center justify-center my-20 py-12'>
     {/* add title */}
       <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer testimonials</h1>
       {/* add text */}
       <p className='text-gray-500 mb-12'>What Our Users are Saying</p>

       <div className='flex flex-wrap gap-6'>
            {testimonialsData.map((testimonial,index)=>(//get testimonial data from assets.js, pass individual testimonial and index as parameter, we can use map method as it is an array
                <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                    <div className='flex flex-col items-center'>
                    {/* add single testimonial.image */}
                        <img src={testimonial.image} alt="" className='rounded-full w-14' />
                        {/* display name in h2 */}
                        <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                        {/* display role */}
                        <p className='text-gray-500 mb-4'>{testimonial.role}</p>
                        <div className='flex mb-4'>
                        {/* display star rating */}
                        {/* add an array with testimonial.stars. fill and here add map method and pass individual item and index */}
                        {/* add star ratings */}
                            {Array(testimonial.stars).fill().map((item,index)=>(
                                <img key={index} src={assets.rating_star}  />
                            ))}
                        </div>
                        {/* add testimonial text */}
                        <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
                    </div>
                </div>
            ))}
       </div>
    </motion.div>
  )
}

export default Testimonials