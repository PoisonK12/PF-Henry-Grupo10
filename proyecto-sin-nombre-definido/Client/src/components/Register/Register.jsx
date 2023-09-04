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
    
        <div className="d-flex  align-items-center justify-content-center ">
            <form className={`d-flex align-items-center justify-content-center m-3 ${style.form}`}>
                <fieldset className="border p-4 d-flex flex-column text-center" >
                    <legend class="display-5"> Registrate !</legend>
                    <hr className = {style.hr}></hr>
                        <div class="d-flex flex-row justify-content-center align-items-center ">

                            
                            <div class="m-3">
                                <label class="form-label" htmlFor="name">Nombre</label>
                                <input type="text" class="form-control" placeholder="Nombre" id="name"/>
                            </div>
                            <div class="m-3">
                                <label class="form-label">Correo</label>
                                <input type="text" class="form-control" placeholder="Correo" />
                            </div>

                        </div>

                        <div class="d-flex flex-row justify-content-center align-items-center ">
                            <div class="m-3">
                                <label class="form-label">Contraseña</label>
                                <input type="password" class="form-control" placeholder="Contraseña" />
                            </div>
                            <div class="m-3">
                                <label class="form-label">Confirmar Contraseña</label>
                                <input type="password" class="form-control" placeholder="Confirmar contraseña" />
                            </div>

                        </div>
                        <hr ></hr>
                        <div class=" m-2">
                            <button aria-describedby="login" className="btn btn-primary" > Registrarse </button>
                        </div>
                        <div class=" m-2">
                            <span> Ya estas registrado?</span>
                            <button  className="btn btn-primary m-3" onClick={handleConditional}> Loguéate </button>
                        </div>
                </fieldset>
            </form>
        </div>
   
    </>
    )
};

export default Register;