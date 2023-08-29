import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from './views/Landing/Landing';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Landing/>} />
     </Routes>
    </>
  )
}

export default App
