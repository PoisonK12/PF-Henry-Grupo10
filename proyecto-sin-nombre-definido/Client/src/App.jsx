import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from './views/Landing/Landing';
import { Home } from './views/Home/Home';
import { Nav } from "./components/Nav/Nav"


function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/" && <Nav/>}
     <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/home' element={<Home/>}/>
     </Routes>
    </>
  )
}

export default App
