import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
// require('dotenv').config();
// import dotenv from 'dotenv'
// dotenv.config()

function GoogleLoginButton() {
  const [user, setUser] = useState({});
  const [logeado, setLogeado] = useState(false);

  const handleGithubLogin = async (response) => {
    // console.log(response)
    try {
      window.location.href = `https://daily-oven-production.up.railway.app/auth/github/`;
      setLogeado(true);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (logeado) {
  //       try {
  //         const response = await axios.get("https://daily-oven-production.up.railway.app/auth/github/callback");

  //         console.log(response.data);
  //       } catch (error) {
  //         console.error("Error en la solicitud Axios:", error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [logeado]);
  // console.log(user)

  // Si no tenemos usuario, pintamos el botón de inicio de sesión.
  // Si tenemos usuario, mostramos el botón de cierre de sesión y la información del usuario.
  return (
    <div>
      {/* Contenedor del botón de inicio de sesión de Google */}
      <button
        onClick={() => {
          const popUp = window.open(
            "https://daily-oven-production.up.railway.app/auth/github/",
            "targetWindow",
            "toolbar=no, location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=620,height=700"
          );
          window.addEventListener("message",(event) => {
            if(event.origin === "https://daily-oven-production.up.railway.app"){
              if(event.data){
                localStorage.setItem("data", JSON.stringify(event.data))
                popUp?.close()
              }
            }
          })
        }}
      >
        {" "}
        Luquinho
      </button>
    </div>
  );
}

export default GoogleLoginButton;
