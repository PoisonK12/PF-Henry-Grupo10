import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import style from "./Nav.module.css";
import Menu from "./Menu/Menu";
import jwtDecode from "jwt-decode";

export const Nav = () => {

  const location = useLocation()

  const [fixed, setFixed] = useState(false);
  const [access , setAccess] = useState(false)
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };


 const log = localStorage.getItem("log")
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

 

  return (
    <nav
      className={`${style.nav} ${
        fixed && location.pathname !== "/addProperty"
          ? style.fixed
          : location.pathname == "/addProperty" ||
            /^\/detail\/[\w-]+$/.test(location.pathname)
          ? style.back
          : ""
      }`}
    >
      <Link to="/" className={style.logo}>
        <img src={logo}></img>
      </Link>

      <ul>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? style.active : style.navHover
            }
          >
            {" "}
            <span>Home </span>
          </NavLink>
        </li>
        
        <li>
          <NavLink
            to="/addProperty"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            <span>Propiedades</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? style.active : style.navHover
            }
          >
            {" "}
            <span>Contacto</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/adminDashboard"
            className={({ isActive }) =>
              isActive ? style.active : style.navHover
            }
          >
            <span>Admin</span>
          </NavLink>
        </li>
      </ul>
      <div >
        {log ? (
          <Menu />
        )
       : (<li>
         
          <NavLink
            to="/checkIn"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            {" "}
            <span> 👩‍💻 Acceder </span>
          </NavLink>
        </li>)
}
        
      </div>
    </nav>
  );
};
