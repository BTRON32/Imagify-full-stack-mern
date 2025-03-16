import React, { useContext } from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
// to add animation, we will use framer-motion(motion.dev/docs), click on react on the left side
// in context folder we will store all the states for this application
const App = () => {
  const {showLogin}=useContext(AppContext)
  return (//padding from x axis(p left and right for mobile screen and for small screen increase px-20, change background color of app and set it to gradient)
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 '>
    <ToastContainer position='bottom-right' />
    {/* navbar will be visible in all pages */}
    <Navbar />
    {/* add condition for Login component, for this we need showLogin context variable, if this showLogin is true, then only we have to display this Login component */}
    { showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
      </Routes>
      {/* footer will be visible in all pages */}
      <Footer />

    </div>
  )
}

export default App