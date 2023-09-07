import React, { useEffect, useState } from "react";
import style from "./contacts.module.css";
import fondo from "../../assets/images/Exteriores/Image12.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getAllReallyProperties } from "../../redux/actions";

const Contacts = () => {
  const allCount = useSelector((state) => state.propertiesCopy);
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllReallyProperties());
    setVisible(true)
  }, []);

  return (
    <div className={style.background}>
      <div className={style.contImg}>

      <img className={style.img} src={fondo}></img>
      </div>
      <div className={style.cont}>
        <form className={`${style["row-cols-1"]} ${style["custom-container"]} ${style['formulario-entrada']} ${visible ?  style['formulario-visible'] : ""}`}>
          <h2 className={style.title}>Contact</h2>
          <div className="mb-3 w-90 ">
            <label htmlFor="name" className="form-label ">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
            />
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="lastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="phone" className="form-label">
              Teléfono
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="+81 548712487"
            />
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@ejemplo.com"
            />
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="message" className="form-label">
              Mensaje
            </label>
            <textarea
              className="form-control"
              style={{ resize: "none" }}
              id="message"
              name="message"
              placeholder="Esciba su mensaje aquí"
              rows="3"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`btn w-100 btn-primary ${style.button}`}
            >
              Enviar
            </button>
          </div>
        </form>
        <div className={style.info}>
          <h2>
            Contactanos!{" "}   
          </h2>
          <div className={style.parrafo}>
            <p>
              En <span>GreatTravel</span>, estamos aquí para ayudarte en cada paso de tu aventura de hospedaje! Ya sea que tengas preguntas sobre una propiedad, necesites asistencia con tu reserva o simplemente quieras saber más sobre nosotros, no dudes en ponerte en contacto..
            </p>
          </div>
          <div className={style.icons}>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              info@gmail.com
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                />
              </svg>
              + 01 234 567 88
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-house-door-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
              </svg>
              HENRY, NY 10012, ARG
            </p>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={style.svg}
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fill-opacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,117.3C384,96,480,96,576,117.3C672,139,768,181,864,197.3C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Contacts;
