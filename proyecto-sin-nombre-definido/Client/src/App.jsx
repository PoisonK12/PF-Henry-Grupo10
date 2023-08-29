import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import {Home} from "./views/Home/Home"
import {Nav} from "./components/Nav/Nav"
import Landing from './views/Landing/Landing';
import NotFound from './views/404/404';


function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/" && <Nav/>}
     <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/home' element={<Home/>}></Route>
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </>
  )
}

export default App;
