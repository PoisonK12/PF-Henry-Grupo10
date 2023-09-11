import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import style from "./Nav.module.css";
import Menu from "./Menu/Menu";

export const Nav = () => {
  const location = useLocation();
  const token = localStorage.getItem("log");
  console.log(token);
  const [fixed, setFixed] = useState(false);
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
  }, []);

  return (
    <nav
      className={`${style.nav} ${
        fixed && location.pathname !== "/addProperty"
          ? style.fixed
          : location.pathname == "/addProperty" ||
            /^\/detail\/[\w-]+$/.test(location.pathname) ||  location.pathname == "/property"
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
      <div>
        {token ? (
          <> 
            <Menu />{" "}
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
