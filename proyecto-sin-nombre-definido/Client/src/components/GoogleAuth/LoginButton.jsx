import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function GoogleLoginButton() {
  // Utiliza el hook useState para gestionar el estado del usuario.
  const [user, setUser] = useState({});

  // Función para manejar el cierre de sesión.
  function handleSignOut(event) {
    // Borra el usuario y muestra nuevamente el botón de inicio de sesión.
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  // Función para manejar la respuesta de la autenticación de Google.
  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    // Decodifica el token JWT para obtener la información del usuario.
    var userObj = jwt_decode(response.credential);
    console.log(userObj);
    // Actualiza el estado del usuario con la información del usuario autenticado.
    setUser(userObj);
    // Oculta el botón de inicio de sesión.
    document.getElementById("signInDiv").hidden = true;
    // ---------------------------------------------------------------------------//
    // ---------------------------------------------------------------------------//    
    //Puedes agregar aquí cualquier lógica adicional que desees realizar después de la autenticación.//
    // ---------------------------------------------------------------------------//
    // ---------------------------------------------------------------------------//

  }

  // Utiliza el hook useEffect para realizar efectos secundarios en la función componente.
  useEffect(() => {
    /*global google*/
    // Inicializa la autenticación de Google con el cliente ID y el controlador de respuesta.
    window.google.accounts.id.initialize({
      client_id: '547235349182-eqd60168p1n8550uulbpd31vvm35sprd.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    // Renderiza el botón de inicio de sesión de Google en el elemento con id "signInDiv".
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  // Si no tenemos usuario, pintamos el botón de inicio de sesión.
  // Si tenemos usuario, mostramos el botón de cierre de sesión y la información del usuario.
  return (
    <div>
      {/* Contenedor del botón de inicio de sesión de Google */}
      <div id="signInDiv"></div>
      
      {/* 
        Si el objeto 'user' contiene propiedades (es decir, el usuario está autenticado),
        muestra el botón de "Sign Out" que llama a la función handleSignOut.
      */}
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
  
      {/* 
        Si el objeto 'user' está definido (es decir, el usuario está autenticado),
        muestra la imagen de perfil y el nombre del usuario.
      */}
      {user && (
        <div>
          {/* Muestra la imagen de perfil del usuario */}
          <img src={user.picture} alt="User Avatar"></img>
  
          {/* Muestra el nombre del usuario */}
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default GoogleLoginButton;
