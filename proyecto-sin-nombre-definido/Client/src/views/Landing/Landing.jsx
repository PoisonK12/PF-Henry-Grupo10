import hotel from "../../assets/hotel-presidente-4s.jpg"
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Get Outstanding Accommodations Today!</h1>
      <h4>
        Somos una plataforma digital que opera en linea donde personas
        particulares y propietarios de alojamientos turisticos pueden conectar
      </h4>
      <Link to={"/home"}>
      <button>INGRESA AQUI</button>
      </Link>
      <img src={hotel} />
    </div>
  );
};

export default Landing;
