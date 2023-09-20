import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import style from "./apa.module.css";
import { getAllUsers, getLogin } from "../../redux/actions";
import { validation } from "./validation";
import { Modal, ToastBody } from "react-bootstrap";
import fondo from "../../assets/images/Exteriores/imageLogin.avif";
import GoogleLoginButton from "../GoogleAuth/LoginButton/";
import Register from "../Register/Register";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, redirect } from "react-router-dom";

const Login = ({ handleSwitch }) => {
  const users = useSelector((state) => state.users);
  console.log("AllUsers", users);
  const dispatch = useDispatch();
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
    e.preventDefault();

    const existUser = users.find((user) => user.email === login.email);

    if (!existUser) {
      Swal.fire({
        title: "Usuario no encontrado",
        icon: "error",
        text: "El usuario no existe en la lista de usuarios.",
      });
      return;
    }

    if (existUser.hide) {
      Swal.fire({
        title: "Usuario suspendedio",
        icon: "error",
        text: "El usuario está suspendido porfavor comunicate con nosotros.",
      });
      return;
    }
    console.log(e);
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
  useEffect(() => {
    dispatch(getAllUsers({ search: "", order: "" }));
  }, []);

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
                <p style={{ color: "red", fontSize: "3px" }}>{errors.email}</p>
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
              <br />
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
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
                <div>
                  <button
                    className={style.Btn}
                    type="button"
                    onClick={() => {
                      const popUp = window.open(
                        "http://localhost:3001/auth/github/",
                        "targetWindow",
                        "toolbar=no, location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=620,height=700"
                      );
                      window.addEventListener("message", (event) => {
                        if (event.origin === "http://localhost:3001") {
                          if (event.data) {
                            const eventData = event.data;
                            // console.log(JSON.parse(data))
                            localStorage.setItem("log", eventData.id);
                            localStorage.setItem(
                              "data",
                              JSON.stringify(eventData)
                            );
                            console.log("aaaaaaaaaaaaaaaaaapa", event.data);
                            popUp?.close();
                            navigate("/home");
                          }
                        }
                      });
                    }}
                  >
                    <span className={style.svgContainer}>
                      <svg fill="black" viewBox="0 0 496 512" height="3em">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                      </svg>
                    </span>
                    <span className={style.contain}></span>
                  </button>
                </div>
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
    </>
  );
};
export default Login;
