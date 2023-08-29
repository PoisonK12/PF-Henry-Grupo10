import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import style from "./Nav.module.css";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={style.nav}>
      <Link to="/" className={style.logo}>
        <img src={logo}></img>
      </Link>
      <div
        className={style.menu}
        onClick={() => {
          setMenuOpen(!menuOpen);
          console.log("hola");
          console.log(menuOpen)
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/contacts">Contactos</NavLink>
        </li>
        <li>
          <NavLink to="/properties">Propiedades</NavLink>
        </li>
      </ul>
    </nav>
  );
};