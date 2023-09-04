import React , {useState} from "react";
import style from "./Login.module.css"
/* import {getLogin} from "../../redux/actions" */

const Login = ({setConditional}) => {

    const [login , setLogin ] = useState({
        email : "",
        password : ""
    });

    const handleChange = (e) => {
          const {name} = e.target;
          const {value} = e.target;

          setLogin({
            ...login,
              [name] : value
          });
     };


    const handleConditional = () => {
        setConditional("register")
     };
/* 
     const handleSubmit = async (e) => {
        e.preventDefault();
        await getLogin(login)
     }; */

    return (
       <>
            <form  class= "d-flex align-items-center justify-content-center text-center p-5  ">
                <fieldset className={`border  d-flex flex-column text-center ${style.form}`}>

                  <div class={`d-flex justify-content-center align-items-center  ${style.perfile}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  </div>
                   
                <div class="d-flex flex-column align-items-center justify-content-center">

                    
               
                  <div class="form-group col-md-11 mt-3">
                    
                    <label class="form-label lead" for="InputEmail">Email : </label>
                    <input type="email" class={`form-control ${style.inputs}`} name="email" id="InputEmail" aria-describedby="emailHelp" value={login.email} placeholder="Escriba su email" onChange={(e) => handleChange(e)}/>
                  </div>

                  <div class="form-group col-md-11 mt-3" >
                    <label class="form-label lead" for="InputPassword">Contraseña :</label>
                    <input type="password" class={`form-control ${style.inputs}`} name="password" id="InputPassword" value={login.password} placeholder="Escriba su contraseña"/>
                  </div>

                </div>
                
                <hr className={style.hr}></hr>
<div class="column mt-1">
                      <span class="m-2" style={{color : "white", fontSize: "18px"}}>Logueate con
                      </span>
                  <button className = {` btn btn-outline-danger ${style.buttonGoogle}`}>
                     Google  
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class={`bi bi-google ${style.icon} m-1`} viewBox="0 0 18 18" style={{color : "red"}}>
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg>
                        </button>
                       <hr className={style.hr}></hr>
                           </div>

                <div class= "d-flex flex-row align-items-center justify-content-center">
                    <span style={{color : "white" ,  fontSize: "18px"}}> No tienes una cuenta? 👉🏼 </span>
                    <div class= "col-xs-6 m-3">
                      <button type="button" class="btn btn-danger" onClick={handleConditional}> Registrarse</button>
                      </div>
            </div>

                <div class=" d-flex flex-row align-items-center justify-content-center ">
                  <span style={{color : "white", fontSize: "18px"}}> Es hora de entrar! 👉🏼</span>
                  <div class="col-xs-6 p-1 m-3 ">
                    <button type="submit" class="btn btn-primary"> Acceder </button>
                  </div>
                   
                </div>
                  
                </fieldset>
            </form>
        </>
    )
};

export default Login;