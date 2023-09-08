import React , {useState} from "react";
import style from "./Register.module.css"
import {getLogin} from "../../redux/actions"
import {validation }from "./validation.js";
import {Toast} from "react-bootstrap"
import axios from "axios";

const Register = ({setConditional , conditional }) => {
    
    
    const [toastBody , setToastBody] = useState({response : ""})
    const [toast , setToast] = useState(false)
    const [errors , setErrors] = useState( {

        profilePic : "",
        userName : "",
        fullName : "",
        phoneNumber : "",
        verificationNumber : "",
        gender : "" , 
        address : "",
        landlord : false ,
        nationality : "",
        birthDate : "",
        email : "",
        password : "",
        confirmPassword : "",
    })
    const [passwordType , setPasswordType ] = useState(false)
    const [passwordType2 , setPasswordType2 ] = useState(false)

    const [register , setRegister ] = useState({

        profilePic : "",
        userName : "",
        fullName : "",
        phoneNumber : "",
        verificationNumber : "",
        gender : "" , 
        address : "",
        landlord : false ,
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
       const {type} = e.target
        
       if(name === "phoneNumber") {
        setRegister({...register , [name] : value, verificationNumber : value})
        return
       }
       
        if(type === "select-one" && name === "landlord") {
            const boolean = Boolean(value)
            setRegister({...register , landlord : boolean})
            return
        };

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
    };

//?------------------------------------------------- Picture handlers -------------------------------------------------------------------------------

const handleDrop = (event) => {

    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);

  };
  
  // Función para manejar el archivo seleccionado
  const handleFile = async (file) => {
    console.log(file);

    if(!file.type.includes('image')) {
      setErrors({...errors, profilePic: "Solo puedes subir imagenes" });
      return;
    } else {

      setErrors({...errors , profilePic : ""});
      const imageURL = URL.createObjectURL( new Blob([file]));
      setRegister({...register , profilePic : imageURL});

      const fileData = new FormData();
      fileData.append("file", file);
      fileData.append("upload_preset", "Imagenes");
      fileData.append("cloud_name", "dkdounmsa");
       const { data } = await axios.post(
       `https://api.cloudinary.com/v1_1/dkdounmsa/image/upload`,
         fileData
       );
    
    setRegister({ ...register, profilePic: data.secure_url });
       }
    };

//?-------------------------------------------------Submit Handlers------------------------------------------------------------------------------------


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation({...register}))

        if(errors) {
            return
        }
        getLogin(register , conditional , setToastBody , setToast);
    };


//?-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
    <>
    
            <form className={`d-flex align-items-center justify-content-center `} onSubmit={handleSubmit}>
                <fieldset className={`border justify-content-center align-items-center d-flex flex-column text-center ${style.form}`} >
                   
            <div className={`d-flex flex-row justify-content-center align-items-center ${style.formmer}`}>
              
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                  
                />

                <div
                  className={`d-flex text-center justify-content-center align-items-center ${style.divDrop}`}
                  
                  style={{
                    border: "2px dashed #ccc",
                    background: "rgba(169, 181, 197, 0.562)",
                    margin: `20px 20px`,
                    textAlign: "center",
                    width: "300px",
                    height: "250px",
                  }}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {register.profilePic 
                  ? <img
                  
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "250px",
                    objectFit : "cover"
                  }}
                  src={register.profilePic}
                  alt={`Image ${register.profilePic}`}
                />
                   : 
                 
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-card-image"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                      </svg>
                      <br></br>
                      Arrastra o haga click{" "}
                      <span
                        className={style.click}
                        onClick={() =>
                          document.getElementById("imageInput").click()
                        }
                      >
                        {" "}
                        aquí
                      </span>
                      !
                    </div>  
                    }
                </div>
                {errors.profilePic ? <p style={{color : "red" , fontSize : "15px"}}>{errors.profilePic}</p> : null}

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

                                <select name="gender"  class={`form-select ${style.select}`}  onChange={handleChange}>
                                    <option selected>--Seleccionar un género--</option>
                                    <option value="Male">Hombre</option>
                                    <option value="Female">Mujer</option>
                                    <option value="Undefined">Indefinido</option>
                                    <option value="No apply">No aplicar</option>
                                </select>
                                {errors.gender ? <p style={{color : "red" , fontSize : "15px"}}>{errors.gender}</p> : null}
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
                                <select name="nationality"  class={`form-select ${style.select}`}  onChange={handleChange}>
                                <option  value = ""> --Selecciona una opción--</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Colombia">Columbia</option>
                                <option value="Mexico">Mexico</option>
                               </select>
                               {errors.nationality ? <p style={{color : "red" , fontSize : "15px"}}>{errors.nationality}</p> : null}
                            </div>
                           
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="landlord"> Usuario o Propietario : </label>
                               <select name="landlord"  class={`form-select ${style.select}`}  onChange={handleChange}>
                                <option value =  ""> --Selecciona una opción--</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                               </select>
                               {errors.landlord ? <p style={{color : "red" , fontSize : "15px"}}>{errors.landlord}</p> : null}
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-center align-items-center ">
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="email">Email :</label>
                                <input type="email" name="email" value={register.email} class={`form-control ${style.inputs}`}  onChange={handleChange} placeholder="Correo electrónico" />
                                {errors.email ? <p style={{color : "red" , fontSize : "15px"}}>{errors.email}</p> : null}

                            </div>
                            
                           
                           

                        </div>

                        <div class="d-flex flex-row justify-content-center align-items-center ">
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="password">Contraseña</label>
                                <input type={passwordType ? "text" : "password"} value={register.password} name="password" class={`form-control ${style.inputs}`} onChange={handleChange} placeholder="Contraseña" />
                                <button class={style.iconPassword} id="hide1"  onClick={(e) => handleHide(e)}>{passwordType ? iconVisible : iconInvisible}</button>
                                {errors.password ? <p style={{color : "red" , fontSize : "15px"}}>{errors.password}</p> : null}

                            </div>
                            <div class="m-3 col-md-5">
                                <label class="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input type={passwordType2 ? "text" : "password"} name="confirmPassword" value={register.confirmPassword} class={`form-control ${style.inputs}`} onChange={handleChange} placeholder="Confirmar contraseña" />
                                <button class={style.iconPassword2} id="hide2" onClick={(e) => handleHide(e)}>{passwordType2 ? iconVisible2 : iconInvisible2}</button>
                                {errors.confirmPassword ? <p style={{color : "red" , fontSize : "15px"}}>{errors.confirmPassword}</p> : null}

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
              <Toast  show={toast}>
               <Toast.Body >{
               <div className>
                   <p > Creado con éxito. Redirigiendote...</p>
               </div>
               }
               </Toast.Body>
               </Toast>
            </div>
    </>
    )
};

export default Register;