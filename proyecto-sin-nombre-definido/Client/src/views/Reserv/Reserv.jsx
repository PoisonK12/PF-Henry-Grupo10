import { Link } from "react-router-dom";
import  validationReserv from "./validationReserv";
import React from "react";
import Booking from "./Booking";

const Reserv = () => {


    return (
        <div>
            <div>
                //*------------carta vertical de la asset seleccionada//---------
                //*------------boton para volver atras y seleccionar otra//------
            </div>
            <div>
                <div className="d-flex justify-content-center align-items-center" 
                    style={{borderColor : "violet"}}
                >
                    <p> Hola!
                    <Link to="/login">Incia sesion </Link> 
                    para poder reservar o 
                    <Link to="/login">crea una cuenta</Link> 
                    para poder enterarte de todo lo nuevo y enterarte de las mejores ofertas !
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Reserv;