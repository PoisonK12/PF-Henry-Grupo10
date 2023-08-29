import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import {Home} from "./views/Home/Home"
import {Nav} from "./components/Nav/Nav"
import Landing from './views/Landing/Landing';
import NotFound from './views/404/404';
import Detail  from './views/Details/Detail';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Footer} from "./components/Footer/Footer"

function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/" && <Nav/>}
     <Routes>
      <Route path='/' element={<><Landing/></>} />
      <Route path='/detail/:id' element={<><Detail/><Footer/></>} />
      <Route path='/home' element={<><Home/><Footer/></>}/>
      <Route path="*" element={<><NotFound/><Footer/></>}/>
     </Routes>
      
     
    </>
  )
}

export default App;
