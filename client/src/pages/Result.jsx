import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import {motion} from "framer-motion"
import { AppContext } from '../context/AppContext'

const Result = () => {
  {/* either display this input field or this button-when we don't have an image, we will display input field so that user can type and generate the image, after generating this image, it will hide this input field, it should display download button, so that user can download the generated image or user can click on this button to generate another image */}

  const [image, setImage]=useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded]=useState(false)//initially image is not loaded, when image is not loaded, we have to display input field

  const [loading, setLoading]=useState(false)//initially loading is false, when loading is false, we have to hide the text Loading...

  const [input, setInput]=useState('')//to store data that we will type in input field

  const {generateImage}=useContext(AppContext)

  // we have to call generate image function whenever we will click on the button
  const onSubmitHandler=async(e)=>{ //whenever we will submit the form, it shoudl execute this form submit function, pass a form submit event as a parameter, this function will be executed whenever we will submit the form, where we will add prompt in input field and click on submit button
    e.preventDefault()//disable page reloading whenever we will reload the page
    setLoading(true)//enable loading

    if (input) {//if input is available, we have some prompt in input field
      const image=await generateImage(input)//call generateImage function, provide prompt that is the input from above line
      if (image) {//if image is available
        setIsImageLoaded(true)//set ImageLoaded to true
        setImage(image)//we are setting image that we are getting from the response
      }
    }
    setLoading(false)//disable the loading
  }


{/* adding a form tag */}
  return (
    
    <motion.form
     initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    // link function with form tag
     onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
      <div className="relative">
      {/* use image state in src */}
        <img src={image} alt="" className='max-w-sm rounded' />
        {/* when loading is true, width will be full else it will be 0(when loading is false, horizontal line and loading text is also hidden)   */}
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]':'w-0'}`} />
      </div>
      {/* add text with message Loading */}
      {/* when loading is false, we have to hide the text Loading... */}
      {/* if loading is true, it will display Loading text */}
      <p className={!loading ? 'hidden':''}>Loading.....</p>
    </div>
    {/* initially image is not loaded, when image is not loaded, we have to display input field */}
    {!isImageLoaded &&//if it(isImageLoaded) is true, then this div is loaded
    
    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
      {/* adding a form */}
      {/* provide value typed in input field and add value property to be input state, now whatever we will type in input field that will be stored in this input state and using this input state we will generate the image  */}
      <input onChange={e=>setInput(e.target.value)} value={input} type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
    </div>
    }

    {isImageLoaded &&//image is already loaded, in that case we will display this div, user can download the image or can click on button to generate another image
    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full '>
    {/* setIsImageLoaded to false, whenever it is false, it will display the input field */}
        <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
        {/* whenever we will click on this link, we will download the image, provide download attribute in a tag */}
        {/* use image state in href, so that whenever user will click on download button, it will download the image as we have added download attribute in a tag */}
        <a className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' href={image} download>Download</a>
    </div>
    }
    </motion.form>
  )
}

export default Result