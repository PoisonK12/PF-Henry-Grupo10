import React, {useState} from "react";
import Login from "../../components/Login/apa.jsx"
import Register from "../../components/Register/Register";
import style from "./LoginRegister.module.css"

const LoginRegister = () => {

    const [conditional , setConditional ] = useState("login");
   

    return (

        <div className ={` ${style.container}`}>

            { conditional === "login" 
            ? <Login setConditional={setConditional} conditional = {conditional} /> 
            : <Register setConditional={setConditional} conditional = {conditional} /> 
            }

        </div>
    )

}

export default LoginRegister;