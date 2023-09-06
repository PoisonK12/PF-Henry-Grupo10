import React , {useState} from "react";
import style from "./Register.module.css"
import {getLogin} from "../../redux/actions"
import {validation }from "./validation.js";
import {Toast} from "react-bootstrap"

const Register = ({setConditional , conditional }) => {
    
    
    const [toastBody , setToastBody] = useState({response : ""})
    const [toast , setToast] = useState(false)
    const [errors , setErrors] = useState( {})
    const [passwordType , setPasswordType ] = useState(false)
    const [passwordType2 , setPasswordType2 ] = useState(false)
    const [register , setRegister ] = useState({

        userName : "",
        fullName : "",
        phoneNumber : "",
        gender : "" , 
        address : "",
        landLord : false ,
        nationality : "",
        birthDate : "",
        email : "",
        password : "",
        confirmPassword : "",

    });



    console.log(register);

    const handleChange = (e) => {
        
        const {name} = e.target;
        const {value} = e.target;

        setRegister({
          ...register,
            [name] : value
        });
        const errorDetect = validation({[name] : value})

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorDetect[name]
          }));
    };
    console.log(errors);
    const  handleHide = (e) => {
        const icon = e.target.id
        
        if(icon === "hide1") {

            if(passwordType) {
                setPasswordType(false)
            } else {
                setPasswordType(true)
            }
        } else if (icon === "hide2") {
            
            if(passwordType2) {
                setPasswordType2(false)
            } else {
                setPasswordType2(true)
            }
        }
    }

    const iconVisible = <svg  onClick={handleHide} xmlns="http://www.w3.org/2000/svg" id="hide1" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
        </svg>
    
    const iconInvisible = <svg  onClick={handleHide} xmlns="http://www.w3.org/2000/svg" id="hide1" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" onClick={handleHide}/>
    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" onClick={handleHide}/>
        </svg>

    const iconVisible2 = <svg onClick={handleHide} xmlns="http://www.w3.org/2000/svg" id="hide2" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
         </svg>

    const iconInvisible2 = <svg onClick={handleHide} xmlns="http://www.w3.org/2000/svg" id="hide2" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" onClick={handleHide}/>
<path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" onClick={handleHide}/>
         </svg>

    const handleConditional= () => {
        setConditional("login")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getLogin(register , conditional , setToastBody);
    };

    return (
    <>
    
            <form className={`d-flex align-items-center justify-content-center `} onSubmit={handleSubmit}>
                <fieldset className={`border  d-flex flex-column text-center ${style.form}`} >
                   
                    <div className={`${style.perfile}`}> 
                    <div className={style.svg}>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="160" height="160" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    </div>
                        
                  </div>
                    

                    
                  <div class="d-flex flex-row justify-content-center align-items-center ">

                            
                    <div class="m-3 col-md-5">
                         <label class="form-label" htmlFor="userName">Nombre de usuario :</label>
                        <input  type="text" name="userName" class={`form-control ${style.inputs}`} value={register.userName} onChange={handleChange} placeholder="Nombre de usuario" />
                        {errors.userName ? <p style={{color : "red" , fontSize : "15px"}}>{errors.userName}</p> : null}
                    </div>
                    <div class="m-3 col-md-5">
                        <label class="form-label" htmlFor="fullName">Nombre Completo : </label>
                         <input type="text" name="fullName" class={`form-control ${style.inputs}`} value={register.fullName} onChange={handleChange}  placeholder="Nombre complleto" />
                         {errors.fullName ? <p style={{color : "red" , fontSize : "15px"}}>{errors.fullName}</p> : null}
                        </div>

                    </div>



                        <div class="d-flex flex-row justify-content-center align-items-center ">

                            
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="birthDate"> Fecha de nacimiento:</label>
                                <input type="date" max="2023-12-31" value={register.birthDate} name="birthDate" class={`form-control ${style.inputs}`}  onChange={handleChange} />
                                {errors.birthDate ? <p style={{color : "red" , fontSize : "15px"}}>{errors.birthDate}</p> : null}
                            </div>
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="phoneNumber">Número de teléfono  :</label>
                                <input  type="tel" name="phoneNumber" value={register.phoneNumber} class={`form-control ${style.inputs}`} onChange={handleChange}  placeholder="Número de teléfono" />
                                {errors.phoneNumber ? <p style={{color : "red" , fontSize : "15px"}}>{errors.phoneNumber}</p> : null}
                            </div>

                        </div>



                        <div class="d-flex flex-row justify-content-center align-items-center ">

                            
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="gender">Género : </label>

                                <select name="gender"  class={`form-select ${style.select}`} aria-label="Default select" onChange={handleChange}>
                                    <option selected>--Seleccionar un género--</option>
                                    <option value="Male">Hombre</option>
                                    <option value="Female">Mujer</option>
                                    <option value="Undefined">Indefinido</option>
                                    <option value="No apply">No aplicar</option>
                                </select>
                            </div>
                            <div class="m-3 col-md-5">
                                <label class="form-label">Direccion :</label>
                                <input type="text" name="address" value={register.address} class={`form-control ${style.inputs}`}  onChange={handleChange} placeholder="Dirección" />
                                {errors.address ? <p style={{color : "red" , fontSize : "15px"}}>{errors.address}</p> : null}

                                
                            </div>

                        </div>
                        <div class="d-flex flex-row justify-content-center align-items-center ">

                            
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="nationality">Nacionalidad : </label>
                                <select name="nationalty"  class={`form-select ${style.select}`}  onChange={handleChange}>
                                <option > --Selecciona una opción--</option>
                                <option value="true">Argentina</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Columbia">Columbia</option>
                                <option value="Mexico">Mexico</option>
                               </select>
                            </div>
                           
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="landLord"> Usuario o Propietario : </label>
                               <select name="landLord"  class={`form-select ${style.select}`}  onChange={handleChange}>
                                <option > --Selecciona una opción--</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                               </select>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-center align-items-center ">
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="email">Email :</label>
                                <input type="email" name="email" value={register.email} class={`form-control ${style.inputs}`}  onChange={handleChange} placeholder="Correo electrónico" />
                            </div>
                            
                           
                           

                        </div>

                        <div class="d-flex flex-row justify-content-center align-items-center ">
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="password">Contraseña</label>
                                <input type={passwordType ? "text" : "password"} value={register.password} name="password" class={`form-control ${style.inputs}`} onChange={handleChange} placeholder="Contraseña" />
                                <button class={style.iconPassword} id="hide1"  onClick={(e) => handleHide(e)}>{passwordType ? iconVisible : iconInvisible}</button>
                            </div>
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input type={passwordType2 ? "text" : "password"} name="confirmPassword" value={register.confirmPassword} class={`form-control ${style.inputs}`} onChange={handleChange} placeholder="Confirmar contraseña" />
                                <button class={style.iconPassword2} id="hide2" onClick={(e) => handleHide(e)}>{passwordType2 ? iconVisible2 : iconInvisible2}</button>
                            </div>

                        </div>
                        <hr className={style.hr} ></hr>
                         <div class="row-md-11 mb-4">
                            <span style={{color : "white", fontSize: "18px"}}> Ya estas registrado? 👉🏼</span>
                            <button  class="btn btn-danger " onClick={handleConditional}> Loguéate </button>

                        </div>
                        <div class="col-md-11 m-2 mb-4">
                            <span style={{color : "white", fontSize: "18px"}}>Si estas listo presionalo 👉🏼</span>
                            <button type="submit" aria-describedby="login" className="btn btn-primary" > Registrarse </button>
                        </div>
                       
                </fieldset>
            </form>
            <div>
              <Toast show={toast}>
                 <Toast.Header>
                <strong className="me-auto">Toast Title</strong>
               </Toast.Header>
               <Toast.Body>{toastBody.response}</Toast.Body>
               </Toast>
            </div>
    </>
    )
};

export default Register;