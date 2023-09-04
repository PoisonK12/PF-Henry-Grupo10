import React , {useState} from "react";
import style from "./Register.module.css"

const Register = ({setConditional}) => {
    
    const [register , setRegister ] = useState({
        username : "",
        email : "",
        password : "",
        confirmPassword : "",
    });

    const handleChange = (e) => {
        const {name} = e.target;
        const {value} = e.target;

        setRegister({
          ...register,
            [name] : value
        });

    };

    const handleConditional= () => {
        setConditional("login")
    }


    return (
    <>
    
            <form className={`d-flex align-items-center justify-content-center p-5 `}>
                <fieldset className={`border  d-flex flex-column text-center ${style.form}`} >
                    <legend class="display-5"> Registrate !</legend>
                   
                    //*aca ira la funcionalidad de arrastrar imagen//
                        <div className={`${style.perfile}`}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  </div>
                    
                        <div class="d-flex flex-row justify-content-center align-items-center ">

                            
                            <div class="m-3">
                                <label class="form-label" htmlFor="name">Nombre</label>
                                <input type="text" class={`form-control ${style.inputs}`}  placeholder="Nombre" id="name"/>
                            </div>
                            <div class="m-3">
                                <label class="form-label">Correo</label>
                                <input type="text" class={`form-control ${style.inputs}`}  placeholder="Correo" />
                            </div>

                        </div>

                        <div class="d-flex flex-row justify-content-center align-items-center ">
                            <div class="m-3">
                                <label class="form-label">Contraseña</label>
                                <input type="password" class={`form-control ${style.inputs}`}  placeholder="Contraseña" />
                            </div>
                            <div class="m-3">
                                <label class="form-label">Confirmar Contraseña</label>
                                <input type="password" class={`form-control ${style.inputs}`}  placeholder="Confirmar contraseña" />
                            </div>

                        </div>
                        <hr className={style.hr} ></hr>
                         <div class="row-md-11 mb-4">
                            <span style={{color : "white", fontSize: "18px"}}> Ya estas registrado? 👉🏼</span>
                            <button  class="btn btn-danger " onClick={handleConditional}> Loguéate </button>
                        </div>
                        <div class="col-md-11 m-2 mb-4">
                            <span style={{color : "white", fontSize: "18px"}}>Si estas listo presionalo 👉🏼</span>
                            <button aria-describedby="login" className="btn btn-primary" > Registrarse </button>
                        </div>
                       
                </fieldset>
            </form>
   
    </>
    )
};

export default Register;