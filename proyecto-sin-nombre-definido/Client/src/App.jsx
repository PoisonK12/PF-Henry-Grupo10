import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import {Home} from "./views/Home/Home"
import {Nav} from "./components/Nav/Nav"
import Landing from './views/Landing/Landing';
import NotFound from './views/404/404';
import Detail  from './views/Details/Detail';


function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/" && <Nav/>}
     <Routes>
      <Route path='/' element={<Landing/>} />
<<<<<<< HEAD
      <Route path='/detail/:id' element={<Detail/>} />
=======
      <Route path='/home' element={<Home/>}></Route>
>>>>>>> 4c4c0908e4eb2e251aa07427c6edaaf8f01c26a3
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </>
  )
}

export default App;
