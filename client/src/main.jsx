// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"//to display different pages based on different routes
import AppContextProvider  from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'

// to display different pages based on different routes
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
  <AppContextProvider>
  <App />
  </AppContextProvider>
  
  </BrowserRouter>
   
  // </StrictMode>,
)
