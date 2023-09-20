import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import style from "./Nav.module.css";
import Menu from "./Menu/Menu";
import jwtDecode from "jwt-decode";

export const Nav = () => {
  const location = useLocation();
  const token = localStorage.getItem("log");
  const data = JSON.parse(localStorage.getItem("data"))
  console.log(token);
  const [fixed, setFixed] = useState(false);
  const [access , setAccess] = useState(false)
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };


  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // localStorage.removeItem("log")
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

 

  return (
    <nav
      className={`${style.nav} ${
        fixed && location.pathname !== "/addProperty"
          ? style.fixed
          : location.pathname == "/addProperty" ||
            /^\/detail\/[\w-]+$/.test(location.pathname) ||  location.pathname == "/property" || /^\/userPanel\/[\w-]+$/.test(location.pathname) || location.pathname == "/adminDashboard"
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
            <span>Inicio </span>
          </NavLink>
        </li>
        
        <li>
          <NavLink
            to="/addProperty"
            className={({ isActive }) => (isActive ? style.active : style.navHover)}
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
        {data && data.userType == "admin" ? <li>
          <NavLink
            to="/adminDashboard"
            className={({ isActive }) =>
              isActive ? style.active : style.navHover
            }
          >
            <span>Admin</span>
          </NavLink>
        </li> :"" }
        
        
        <li>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              isActive ? style.active : style.navHover
            }
          >
            {" "}
            <span>FAQ</span>
          </NavLink>
        </li>
        
      </ul>
      <div>
        {token ? (
          <> 
          <div style={{display:"flex", flexDirection:"row"}}>
            <p style={{display:"flex", alignItems:"center", margin:"0 auto", color:"#f0f0f0"}}>Mi perfil</p>
            <Menu />{" "}
          </div>
          </>
        ) : (
          <><li>
          <NavLink
            to="/checkIn"
            className={`${style.noHover} ${fixed ? style.login : ""}`}
            // className={({ isActive }) => (isActive ? style.active : style.navHover)}
            // style={{background:"#9d0aca", padding:"5px"}}
          >
            {" "}
            <span style={{color:"#f0f0f0"}}> Acceder </span>
          </NavLink>
        </li>
  
          </>
        )}
      </div>
    </nav>
  );
};
