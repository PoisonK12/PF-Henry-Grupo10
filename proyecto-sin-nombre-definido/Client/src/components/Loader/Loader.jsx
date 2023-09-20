import React from 'react'
import style from "./Loader.module.css"

const Loader = () => {
  return (
    <div style={{height:"100vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
    <div className={style.loader}></div>
    </div>
  )
}

export default Loader