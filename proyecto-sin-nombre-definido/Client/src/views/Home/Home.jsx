import React from 'react';
import   hotel  from "../../assets/favorite_people1.jpg"
import style from "./Home.module.css"

export const Home = () => {

  return (
    <>

      <div className={style.home}>
        <h1> Welcome to the chilli´s !</h1>
        <div><img src={hotel} alt='foto' className={style.img}></img></div>  
        <div>Cards</div>

      </div>
    </>
  )

};
