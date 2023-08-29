import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from './views/Landing/Landing';
import NotFound from './views/404/404';
import Detail  from './views/Details/Detail';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/detail/:id' element={<Detail/>} />
      <Route path="*" element={<NotFound/>}/>
     </Routes>
    </>
  )
}

export default App;
