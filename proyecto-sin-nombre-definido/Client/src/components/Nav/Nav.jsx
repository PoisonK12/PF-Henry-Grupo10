import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import style from "./Nav.module.css";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

 

  return (
    <nav className={`${style.nav}`}>
      <Link to="/" className={style.logo}>
        <img src={logo}></img>
      </Link>
      <h2>W.I.P</h2>
      <div
        className={style.menu}
        onClick={() => {
          setMenuOpen(!menuOpen);
          console.log("hola");
          console.log(menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
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
            to="/contacts"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            {" "}
            <span>Contactos</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/properties"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            <span>Propiedades</span>
          </NavLink>
        </li>
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
