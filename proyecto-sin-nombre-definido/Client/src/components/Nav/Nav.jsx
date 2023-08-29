import React from "react";
import {Link} from "react-router-dom"
import logo from "../../assets/logo.png"
import style from "./Nav.module.css"


export const Nav = () => {
    
    return (
        <div className={style.nav}>
            <Link to="/home"><img className="img" src={logo}></img></Link>
            <h1> Work in Progress </h1>
            <Link to="/home"><button className="button_home"> Home </button></Link>
            <ul>  Menú
                <Link to="admin"><li> Admin </li></Link>
                <Link to="profile"><li> Perfil</li></Link>
                <Link to="own_property"><li> Mis propiedades</li></Link>
                <Link to="orders"><li> Ordenes pendientes </li></Link>
                <li>Cerrar sesión</li>
            </ul>

        </div>
    )
};