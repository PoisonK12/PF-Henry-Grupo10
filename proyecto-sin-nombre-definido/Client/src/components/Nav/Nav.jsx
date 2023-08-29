import React from "react";
import {Link} from "react-router-dom"
import logo from "../../assets/logo.png"
import style from "./Nav.module.css"


export const Nav = () => {
    
    return (
        <div className={style.nav}>
            <img src={logo}></img>
            <Link to="/home"><button> Home </button></Link>
        </div>
    )
};