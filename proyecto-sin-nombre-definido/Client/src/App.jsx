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
import LoginRegister from "./views/LoginRegister/LoginRegister"
import UserPanel from './views/User/UserPanel';
import Chatbot from './components/Chatbot/Chatbot';
import { useEffect } from 'react';
axios.defaults.baseURL = "http://localhost:3001"
import jwt_decode from "jwt-decode"
import ScrollToTop from './Helpers';



function App() {
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObj = jwt_decode(response.credential)
    console.log(userObj);

  }
    useEffect(()=>{
      /*global google*/
      window.google.accounts.id.initialize({
        client_id: "547235349182-eqd60168p1n8550uulbpd31vvm35sprd.apps.googleusercontent.com",
        callback: handleCallbackResponse

      });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme:"outline", size:"large"}
      );


    },[]);
  
  const [access , setAccess] = useState(false);
  
  const location = useLocation()

  return (
    <>
     {/* { <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div id="signInDiv"></div>
    </div> } */}

      {location.pathname !== "/" && <Nav/>}
      <ScrollToTop></ScrollToTop>
     <Routes>
      <Route path='/' element={<><Landing/></>} />
      <Route path='/detail/:id' element={<><Detail/><Footer/><Chatbot/></>} />
      <Route path='/home' element={<><Home/><Footer/><Chatbot/></>}/>
      {/* <Route path='/property' element={<><Property/><Footer/><Chatbot/></>}/> */}
      <Route path='/contacts' element={<><Contatcs/><Footer/><Chatbot/></>}/>
      <Route path='/property' element={<><Property/><Chatbot/><Footer/></>}/>
      <Route path='/adminDashboard' element={<><AdminDashboard/><Footer/></>}/>
      <Route path='/userPanel' element={<><UserPanel/><Footer/></>}/>
      <Route path='/addProperty' element={<><PropertyForm/><Footer/><Chatbot/></>}></Route>           
      <Route path="/checkIn" element={<><LoginRegister/><Footer/></>}></Route>
      <Route path="*" element={<><NotFound/><Footer/></>}/>
     </Routes>
      
     
    </>
  )
}

export default App;
