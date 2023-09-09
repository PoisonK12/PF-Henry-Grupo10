import React, { useState } from "react";
import { useNavigate } from "react-router";
import style from "./Login.module.css";
import { getLogin } from "../../redux/actions";
import { validation } from "./validation";
import { Modal, ToastBody } from "react-bootstrap";
import fondo from "../../assets/images/Exteriores/imageLogin.avif";
import GoogleLoginButton from "../GoogleAuth/LoginButton/";

const Login = ({ setConditional, conditional }) => {
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
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255, 255, 255, 0.701)",
            width: "100%",
            display: "flex",
            margin: "0 auto",
          }}
        >
          <img
            src={fondo}
            style={{
              objectFit: "cover",
              display: "block",
              width: "70%",
              border: "none",
              // borderRadius:"none",
            }}
            className={style.img}
          ></img>
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
            {/* <div class="column mt-1">
              <span class="m-2" style={{ fontSize: "18px" }}>
                Logueate con
              </span>
              <GoogleLoginButton />
              <button
                className={` btn btn-outline-danger ${style.buttonGoogle}`}
              >
                Google
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class={`bi bi-google ${style.icon} m-1`}
                  viewBox="0 0 18 18"
                  style={{ color: "red" }}
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </button>
              <hr className={style.hr}></hr>
            </div> */}

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
                <p>Sin cuenta? <span onClick={handleConditional} style={{cursor:"pointer", color:"blueviolet"}}>Registrate</span></p>
            <hr className={style.hr}></hr>
                <p style={{ marginTop: "15px" }}>O inicia sesion con</p>
                  <div style={{display:"flex", justifyContent:"center"}}>
                  <GoogleLoginButton />
                  </div>
              </div>
            </div>
            {/* <div class=" d-flex flex-row align-items-center justify-content-center ">
              <span style={{ fontSize: "18px" }}> Es hora de entrar</span>
              <div class="col-xs-6 p-1 m-3 ">
                <button type="submit" class="btn btn-primary" onClick={handleConditional}>
                  {" "}
                  Acceder{" "}
                </button>
              </div>
            </div> */}
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
