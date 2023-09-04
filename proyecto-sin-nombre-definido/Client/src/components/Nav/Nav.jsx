import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import style from "./Nav.module.css";

export const Nav = () => {
  const [fixed, setFixed] = useState(false);
  const handleScroll = () => {
    if(window.scrollY > 50){
      setFixed(true)
    }else{
      setFixed(false)
    }
  }
 
  useEffect(() => {
    window.addEventListener("scroll" , handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
}, [])

  return (
    <nav className={`${style.nav} ${fixed ? style.fixed : ""}`}>
      <Link to="/" className={style.logo}>
        <img src={logo}></img>
      </Link>
      
     
      <ul >
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            {" "}
            <span>Home </span>
          </NavLink>
        </li>
         <li>

          <NavLink
            to="/checkIn"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            {" "}
            <span> 👩‍💻 Acceder </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contacts"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            {" "}
            <span>Contacto</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/addProperty'
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            <span>Propiedades</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/property"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            <span>Houses</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/adminDashboard"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            <span>Admin</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
