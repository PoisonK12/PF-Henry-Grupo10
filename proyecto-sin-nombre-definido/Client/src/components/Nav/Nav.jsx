import React from "react";
import {Link} from "react-router-dom"
import logo from "../../assets/logo.png"
import style from "./Nav.module.css"


export const Nav = () => {
    
    return (
        <div className={style.nav}>
            <div>  
                <Link to="/home"><img className="img" src={logo}></img></Link>
            </div>
          
            <Link to="/home"><button className="button_home"> Home </button></Link>
        </div>
    )
};