import React, { useState } from "react";
import { useNavigate } from "react-router";
import style from "./apa.module.css";
import { getLogin } from "../../redux/actions";
import { validation } from "./validation";
import { Modal, ToastBody } from "react-bootstrap";
import fondo from "../../assets/images/Exteriores/imageLogin.avif";
import GoogleLoginButton from "../GoogleAuth/LoginButton/";
import Register from "../Register/Register";


const Login = ({ handleSwitch}) => {


  const typeForm = "login";
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


  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2500);
    await getLogin(
      login,
      setToastBody,
      setToast,
      navigate,
      setErrors,
      typeForm 
    );
  };

  console.log(toastBody);

  return (
    <>
          <form onSubmit={handleSubmit}>
            <fieldset
              className={`border  d-flex flex-column text-center ${style.form}`}
            >
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
                  <br></br>
                    <br></br>
                  <p>
                    Sin cuenta?{" "}
                    <span
                      onClick={handleSwitch}
                      style={{ cursor: "pointer", color: "blueviolet" }}
                    >
                      Registrate
                    </span>
                  </p>
                  <hr className={style.hr}></hr>
                  <p style={{ marginTop: "15px" }}>O inicia sesion con</p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {/* <GoogleLoginButton /> */}
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
                          >
                          </img>
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
        
</> 
)
}
export default Login;

