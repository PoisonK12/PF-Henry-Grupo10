// import React from "react";

// const apa = () => {
//   return (
//     <div class="container">
//       <div class="overlay" id="overlay">
//         <div class="sign-in" id="sign-in">
//           <h1>Welcome Back!</h1>
//           <p>To keep connected with us please login with your personal info</p>
//           <button class="switch-button" id="slide-right-button">
//             Sign In
//           </button>
//         </div>
//         <div class="sign-up" id="sign-up">
//           <h1>Hello, Friend!</h1>
//           <p>Enter your personal details and start a journey with us</p>
//           <button class="switch-button" id="slide-left-button">
//             Sign Up
//           </button>
//         </div>
//       </div>
//       <div class="form">
//         <div class="sign-in" id="sign-in-info">
//           <h1>Sign In</h1>
//           <div class="social-media-buttons">
//             <div class="icon">
//               <svg viewBox="0 0 24 24">
//                 <path
//                   fill="#000000"
//                   d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z"
//                 />
//               </svg>
//             </div>
//             <div class="icon">
//               <svg viewBox="0 0 24 24">
//                 <path
//                   fill="#000000"
//                   d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z"
//                 />
//               </svg>
//             </div>
//             <div class="icon">
//               <svg viewBox="0 0 24 24">
//                 <path
//                   fill="#000000"
//                   d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
//                 />
//               </svg>
//             </div>
//           </div>
//           <p class="small">or use your email account:</p>
//           <form id="sign-in-form">
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <p class="forgot-password">Forgot your password?</p>
//             <button class="control-button in">Sign In</button>
//           </form>
//         </div>
//         <div class="sign-up" id="sign-up-info">
//           <h1>Create Account</h1>
//           <div class="social-media-buttons">
//             <div class="icon">
//               <svg viewBox="0 0 24 24">
//                 <path
//                   fill="#000000"
//                   d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z"
//                 />
//               </svg>
//             </div>
//             <div class="icon">
//               <svg viewBox="0 0 24 24">
//                 <path
//                   fill="#000000"
//                   d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z"
//                 />
//               </svg>
//             </div>
//             <div class="icon">
//               <svg viewBox="0 0 24 24">
//                 <path
//                   fill="#000000"
//                   d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
//                 />
//               </svg>
//             </div>
//           </div>
//           <p class="small">or use your email for registration:</p>
//           <form id="sign-up-form">
//             <input type="text" placeholder="Name" />
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button class="control-button up">Sign Up</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default apa;

import React, { useState } from "react";
import { useNavigate } from "react-router";
import style from "./Login.module.css";
import { getLogin } from "../../redux/actions";
import { validation } from "./validation";
import { Modal, ToastBody } from "react-bootstrap";
import fondo from "../../assets/images/Exteriores/imageLogin.avif";
import GoogleLoginButton from "../GoogleAuth/LoginButton/";

const Login = ({ setConditional, conditional }) => {
  const [loginSlide, setLoginSlide] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ errorsBack: undefined });
  const [toastBody, setToastBody] = useState({ success: false, data: {} });
  const [toast, setToast] = useState(false);
  const navigate = useNavigate("/home");

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
    const errorDetect = validation({ [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorDetect[name],
    }));
  };
  console.log(login);

  const handleConditional = () => {
    setConditional("register");
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2500);
    await getLogin(
      login,
      setToast,
      conditional,
      setToastBody,
      navigate,
      setErrors
    );
  };

  console.log(toastBody);

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(45deg, rgba(29,88,148,1) 7%, rgba(186,38,224,1) 100%)",
          border: "none",
          width: "100vw",
          display: "flex",
          padding: "50px",
          paddingInline: "10%",
          paddingBlock: "5%",
          position: "relative",
          margin: "auto",
        }}
      >
        <div className={style.overlay}>
          <img
            src={fondo}
            style={{
              objectFit: "cover",
              height: "616px",
              width: "40%",
              display: "block",
              // width: "70%",
              // border: "none",
              // borderRadius:"none",
            }}
            className={style.img}
          ></img>
        </div>
        <div style={{
              background: "rgba(255, 255, 255, 0.701)",
              width: "100%",
              margin: "0 auto",
            }}>
          <form
            onSubmit={handleSubmit}
            
          >
            <fieldset
              className={`border  d-flex flex-column text-center ${style.form}`}
            >
              {/* <div class={`d-flex justify-content-center align-items-center  ${style.perfile}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  </div> */}

              <div
                class="d-flex flex-column align-items-center justify-content-center"
                style={{ width: "80%" }}
              >
                <h2
                  style={{
                    marginTop: "15px",
                    letterSpacing: "6px",
                    color: "#091f44",
                  }}
                >
                  LOGIN
                </h2>
                <div class="mt-3" style={{ textAlign: "left", width: "80%" }}>
                  <label class="form-label lead" for="InputEmail">
                    Email{" "}
                  </label>
                  <input
                    type="email"
                    class={`form-control ${style.inputs}`}
                    name="email"
                    id="InputEmail"
                    aria-describedby="emailHelp"
                    value={login.email}
                    placeholder="Escriba su email"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.email ? (
                    <p style={{ color: "red", fontSize: "3px" }}>
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div class="mt-3" style={{ textAlign: "left", width: "80%" }}>
                  <label class="form-label lead" for="InputPassword">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    class={`form-control ${style.inputs}`}
                    name="password"
                    id="InputPassword"
                    value={login.password}
                    onChange={handleChange}
                    placeholder="Escriba su contraseña"
                  />
                  {errors.password ? (
                    <p style={{ color: "red", fontSize: "3px" }}>
                      {errors.password}
                    </p>
                  ) : null}
                </div>
              </div>

              <hr className={style.hr}></hr>

              <div class="d-flex flex-row align-items-center justify-content-center">
                <div class="col-xs-6 m-3">
                  <button
                    style={{
                      width: "100%",
                      paddingInline: "100px",
                      paddingBlock: "10px",
                    }}
                    type="submit"
                    className={style.button}
                  >
                    {" "}
                    Acceder
                  </button>
                  <p>
                    Sin cuenta?{" "}
                    <span
                      onClick={handleConditional}
                      style={{ cursor: "pointer", color: "blueviolet" }}
                    >
                      Registrate
                    </span>
                  </p>
                  <hr className={style.hr}></hr>
                  <p style={{ marginTop: "15px" }}>O inicia sesion con</p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <GoogleLoginButton />
                  </div>
                </div>
              </div>
            </fieldset>

            <div class={style.alert}>
              {toast && toastBody.success === true ? (
                <div class="justify-self-center align-self-center">
                  <Modal show={toast}>
                    <Modal.Header>
                      <Modal.Title>Logueado con exito✅</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <h3>Bienvenido</h3>
                        <div>
                          <img
                            src={toastBody.data.profilePic}
                            alt="foto de perfil"
                          ></img>
                        </div>
                        <h6>{toastBody.data.userName}</h6>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <p> Redirigiendote....</p>
                    </Modal.Footer>
                  </Modal>
                </div>
              ) : toast && toastBody.success === false ? (
                <div class="justify-self-center align-self-center">
                  <Modal show={toast}>
                    <Modal.Header>
                      <Modal.Title>Ocurrio un error🚨</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <p> Intentalo de nuevo</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                  </Modal>
                </div>
              ) : null}
            </div>
          </form>
        </div>
        <div className={style.leftForm}>
            
        </div>
      </div>
    </>
  );
};

export default Login;

{
  /* <div class="alert alert-success" style={{backgroundColor : "rgba(81, 187, 99, 0.863)"}} role="alert">
                {toastBody && 
                <div>
                  <h2 style={{color : "green"}}>Bienvenido!</h2>
                  {/* <div>
                    <img src={toastBody.data.profilePic} alt="foto de perfil"></img>
                  </div> 
                  <div>
                    <h6>{toastBody.data.userName}</h6>
                    <p>Reirigiendote...</p>
                  </div>
                </div>
               </div> */
}

// .buttonGoogle {
//     background-color : rgba(255, 255, 255, 0.801);
//     padding: 4px;
//     border-color:  rgb(219, 46, 69);
//     color : rgba(81, 187, 99, 0.863);
//     border-radius: 5px;
//     box-shadow :2px 2px 2px rgba(0, 0, 0, 0.815);
// }
// .buttonGoogle:hover {
   
//     color: white;
//     background-color: rgb(219, 46, 69);
//     border-color : rgb(219, 46, 69);
// }


// .form {
//     background-color: transparent;
//   box-shadow:  0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.2 );
//     align-items: center;
//     justify-content: center;
//     background-color: rgba(255, 255, 255, 0.801);
//     /* rgba(245, 245, 245, 0.589) */
//     /* box-shadow: 4px  4px rgba(255, 255, 255, 0.534); */
//     border-radius: 10px ;
//     border: none;
//     margin: 60px;
//     width: 40%;
//     margin-left: auto;
//     float: right;

// }

// .img{
//     width: calc(385px - 50px * 2);
//     border-radius: none !important;
//     border-top-right-radius: none !important;
//     border-top-left-radius: none !important;
//   box-shadow:  14px 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.2 );

//     /* box-shadow: -3px -3px 20px black; */
// }
// .form legend {
//     color:  white;
// }
// .form legend:hover {
//     color:  rgb(219, 46, 69);;
// }

// .hr {
//    border-bottom: 2px;
//    width: 80%;
//    /* border-width: 3px; */
//    color: rgba(79, 79, 79, 0.33);
// }

// .perfile {
//     /* border-radius: 10px 10px 0 0; */
//     box-sizing: border-box;
//     background-color: blanchedalmond;
//     padding : 20px;
//     height: 120%;
//     box-shadow: 4px 4px rgba(255, 255, 255, 0.678);
// }

// .buttonGoogle:hover .icon {
//         color: white !important;
// }

// .form div div span {
//     color: black;
    
    
// }

// .inputs {
//     background-color: transparent;
//     border : 0 0 2px 0;
   
// }
// .inputs::placeholder , label {
//      /* color : white */
// }

// .inputs:hover {
//     border-color:rgb(224, 78, 98) !important;
//     border-width: 2px !important;
// }

// .inputs::placeholder :hover {
//     /* color : blanchedalmond */
// }


// .inputs:focus {
//     background-color:rgba(255, 255, 255, 0.096) !important;
// }

// .button{
//     background: #091f44;
//     border-radius: 20px;
//     color:aliceblue;
// }
// .button:hover{
//     background-color: #06142d;
// }

// .overlay{
//     width:100%;
//     height: 616px;

//     /* height:100%; */
//     position: absolute;
//     z-index: 20;
//     clip: rect(0, 385px, 100%, 0);
// }