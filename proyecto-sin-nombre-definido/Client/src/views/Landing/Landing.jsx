import hotel from "../../assets/hotel-presidente-4s.jpg"
import React from "react";
import style from "./Landing.module.css"
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.background}>
        <div className={style.container}>
        <div className={style.header}>
      <h1>Get Outstanding Accommodations Today!</h1>
      <h4>
        Somos una plataforma digital que opera en linea donde personas
        particulares y propietarios de alojamientos turisticos pueden conectar
      </h4>
      </div>
      <Link to={"/home"}>
      <button>INGRESA AQUI</button>
      </Link>
      <img src={hotel} />
      </div>
    </div>
  );
};

export default Landing;
