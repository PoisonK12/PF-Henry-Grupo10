import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Route, Routes, useLocation,} from "react-router-dom";
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
import LoginRegister from "./views/LoginRegister/LoginRegister"
import UserPanel from './views/User/UserPanel';
import Chatbot from './components/Chatbot/Chatbot';
import { useEffect } from 'react';
import Login from "./components/Login/apa"
axios.defaults.baseURL = "https://daily-oven-production.up.railway.app"
import jwt_decode from "jwt-decode"
import {RouteAdminProtected, ScrollToTop} from './Helpers';
import Loader from './components/Loader/Loader';
import FAQ from './views/Faq/Faq';
import Reserv from './views/Reserv/Reserv';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import ResetPassword from './views/ForgotPassword/ResetPassword';
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions"
import { RouteProtected } from './Helpers';



function App() {
  
  const location = useLocation()
//   localStorage.removeItem("data")
  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const loader = setTimeout(() => {
  //     setLoading(false)
  //   }, 2000)
  //   return () => clearTimeout(loader)
  // }, [])

  const token = localStorage.getItem("log")



  return (
    <>
    
    {/* {loading && <Loader></Loader>} ? lOADER */}
       {(location.pathname !== "/" && location.pathname !== "/checkIn" && location.pathname !=="/404" && location.pathname !== "/forgot-password") && <Nav />} 
      <ScrollToTop></ScrollToTop>
      
     <Routes>
      <Route path='/' element={<><Landing/></>} />
      <Route path='/detail/:id' element={<><Detail/><Footer/><Chatbot/></>} />
      <Route path='/home' element={<><Home/><Footer/><Chatbot/></>}/>
      {/* <Route path='/property' element={<><Property/><Footer/><Chatbot/></>}/> */}
      {/* <RutaProtegida exact path="/addProperty" componente={<Property></Property>} token={token} ></RutaProtegida> */}
      {/* <Route path="/addPropery" element={<RutaProtegida token={token} ><PropertyForm></PropertyForm></RutaProtegida>} /> */}
      <Route path='/contacts' element={<><Contatcs/><Footer/><Chatbot/></>}/>
      <Route path='/property' element={<><Property/><Chatbot/><Footer/></>}/>
      <Route path="/checkIn" element={<><LoginRegister/><Footer/></>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path="/reset_password/:id/:token" element={<ResetPassword/>}></Route>


//? ------------------------------------------------- RUTAS PROTEGIDAS --------------------

      <Route element={<RouteProtected></RouteProtected>}>
      <Route path='/userPanel/:id' element={<><UserPanel/><Footer/></>}/>
      <Route path='/addProperty' element={<><PropertyForm/><Footer/><Chatbot/></>}></Route>           
      </Route>

//? ------------------------------------------------- RUTAS PROTEGIDAS --------------------

//! ----------------------------------------------- RUTAS PROTEGIDAS ADMIN ----------------

      <Route element={<RouteAdminProtected /> }>
      <Route path='/adminDashboard' element={<><AdminDashboard/><Footer/></>}/>
      </Route>

//! ----------------------------------------------- RUTAS PROTEGIDAS ADMIN ----------------

      <Route path="/terms&Conditions" element={<><TermsAndConditions/><Footer/></>}></Route>
      <Route path="/reserv" element={<><Reserv/><Footer/></>}></Route>     
      <Route path="/demo" element={<><Loader/><Footer/></>}></Route> 
      <Route path="/faq" element={<><FAQ/><Footer/></>}></Route>  
      <Route path="/faq" element={<><FAQ/><Footer/></>}></Route>
      <Route path="*" element={<><NotFound/><Footer/></>}/>
     </Routes>
      
     
    </>
  )
}

export default App;
