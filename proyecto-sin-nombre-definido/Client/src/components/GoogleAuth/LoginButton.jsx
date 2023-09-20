import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
// require('dotenv').config();
// import dotenv from 'dotenv'
// dotenv.config()

function GoogleLoginButton() {
  const [user, setUser] = useState({});

  // function handleSignOut(event) {
  //   setUser({});
  //   localStorage.removeItem("token");
  //   document.getElementById("signInDiv").hidden = false;
  // }

  // async function handleCallbackResponse(response) {
  //   localStorage.setItem("token", response.credential);
  //   var userObj = jwt_decode(response.credential);
  //   console.log(userObj);
  //   setUser(userObj);
  //   document.getElementById("signInDiv").hidden = true;
  //   try {
  //     const { data } = await axios("http://localhost:3001/auth/google/");
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const googleClientId = import.meta.env.VITE_CLIENT_ID_GOOGLE
 
  const handleGoogleLogin = async(response) => {
    console.log(response)
    try {
      window.open(`http://localhost:3001/auth/google`)
      // const {data} = await axios("http://localhost:3001/auth/google/")
      // console.log(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  

  // Si no tenemos usuario, pintamos el botón de inicio de sesión.
  // Si tenemos usuario, mostramos el botón de cierre de sesión y la información del usuario.
  return (
    <div>
      {/* Contenedor del botón de inicio de sesión de Google */}
      <button onClick={handleGoogleLogin}> Luquinho</button>

  
    </div>
  );
}

export default GoogleLoginButton;
