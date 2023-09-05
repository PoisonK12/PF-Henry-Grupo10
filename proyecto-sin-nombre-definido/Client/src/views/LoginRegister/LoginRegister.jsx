import React, {useState} from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import style from "./LoginRegister.module.css"

const LoginRegister = () => {

    const [conditional , setConditional ] = useState("login");


    return (

        <div className ={` ${style.container}`}>

            { conditional === "login" 
            ? <Login setConditional={setConditional}/> 
            : <Register setConditional={setConditional}/> 
            }

        </div>
    )

}

export default LoginRegister;