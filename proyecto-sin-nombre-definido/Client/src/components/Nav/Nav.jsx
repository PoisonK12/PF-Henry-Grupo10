import React from "react";
import {Link} from "react-router-dom"
import logo from "../../assets/logo.png"
import {Home} from "../../views/Home/Home"

export const Nav = () => {
    
    return (
        <div>
            <img src={logo}></img>
            <Link to="/home"><button> Home </button></Link>
        </div>
    )
};