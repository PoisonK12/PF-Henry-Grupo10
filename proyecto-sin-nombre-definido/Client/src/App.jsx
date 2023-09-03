import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import {Home} from "./views/Home/Home"
import Property from './views/Property/Propert';
import {Nav} from "./components/Nav/Nav"
import Landing from './views/Landing/Landing';
import NotFound from './views/404/404';
import Detail  from './views/Details/Detail';
import AdminDashboard from "./views/AdminDashboard/adminDashboard"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios"
import {Footer} from "./components/Footer/Footer"
import PropertyForm from "./views/Property Form/PropertyForm"
import Contatcs from './views/Contacts/Contatcs';


axios.defaults.baseURL = "http://localhost:3001"


function App() {



  
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/" && <Nav/>}
     <Routes>
      <Route path='/' element={<><Landing/></>} />
      <Route path='/detail/:id' element={<><Detail/><Footer/></>} />
      <Route path='/home' element={<><Home/><Footer/></>}/>
      <Route path='/property' element={<><Property/><Footer/></>}/>
      <Route path='/contacts' element={<><Contatcs/><Footer/></>}/>
      <Route path='/property/:location' element={<><Property/><Footer/></>}/>
      <Route path='/adminDashboard' element={<><AdminDashboard/><Footer/></>}/>   
      <Route path='/addProperty' element={<><PropertyForm/><Footer/></>}></Route> 
      <Route path="*" element={<><NotFound/><Footer/></>}/>
     </Routes>
      
     
    </>
  )
}

export default App;
