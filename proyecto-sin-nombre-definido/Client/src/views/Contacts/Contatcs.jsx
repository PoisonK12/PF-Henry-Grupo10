import React, { useEffect, useState } from "react";
import style from "./contacts.module.css";
import fondo from "../../assets/images/Exteriores/Image12.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { createContact, getAllContact, getAllReallyProperties } from "../../redux/actions";

const Contacts = () => {

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  
  const [contact, setContact] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza validaciones de los campos del formulario
    const validationErrors = {};
    if (!contact.name) {
      validationErrors.name = "El nombre es obligatorio.";
    }
    if (!contact.lastname) {
      validationErrors.lastname = "El apellido es obligatorio.";
    }
    if (!contact.phone) {
      validationErrors.phone = "El teléfono es obligatorio.";
    }
    if (!contact.email) {
      validationErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
      validationErrors.email = "Ingrese un correo electrónico válido.";
    }
    if (!contact.message) {
      validationErrors.message = "El mensaje es obligatorio.";
    }

    // Si hay errores, muestra los mensajes de error
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // No hay errores, puedes enviar el formulario
      dispatch(createContact(contact));

      // Restablece el formulario
      setContact({
        name: "",
        lastname: "",
        phone: "",
        email: "",
        message: "",
      });

      // Limpia los errores
      setErrors({});
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value
    });
    // Limpia el mensaje de error cuando el usuario comienza a escribir de nuevo
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={style.background}>  
      <div className={style.contImg}>
        <img className={style.img} src={fondo} alt="Background" />
      </div>
      <div className={style.cont}>
        <form onSubmit={handleSubmit} className={`${style["row-cols-1"]} ${style["custom-container"]} ${style['formulario-entrada']} ${visible ?  style['formulario-visible'] : ""}`}>
          <h2 className={style.title}>Envíanos un mensaje...</h2>
          <div className="mb-3 w-90 ">
            <label htmlFor="name" className="form-label ">
              Nombre
            </label>
            <input
              onChange={handleChange}
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Nombre"
              name="name"
              value={contact.name}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="lastname" className="form-label">
              Apellido
            </label>
            <input
              onChange={handleChange}
              type="text"
              className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
              id="lastname"
              name="lastname"
              placeholder="Apellido"
              value={contact.lastname}
            />
            {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="phone" className="form-label">
              Teléfono
            </label>
            <input
              onChange={handleChange}
              type="tel"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              name="phone"
              placeholder="+81 548712487"
              value={contact.phone}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              placeholder="name@ejemplo.com"
              value={contact.email}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="message" className="form-label">
              Mensaje
            </label>
            <textarea
              onChange={handleChange}
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              style={{ resize: "none" }}
              id="message"
              name="message"
              placeholder="Escribe tu mensaje aquí"
              rows="3"
              value={contact.message}
            ></textarea>
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
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
            Contacta nuestro <span>equipo profesional para encontrar la casa de tus sueños</span>!{" "}   
          </h2>
          <div className={style.parrafo}>
            <p>
              En <span>GreatTravel</span>, estamos aquí para ayudarte en cada paso de tu aventura de hospedaje! Ya sea que tengas preguntas sobre una propiedad, necesites asistencia con tu reserva o simplemente quieras saber más sobre nosotros, no dudes en ponerte en contacto.
            </p>
          </div>
          <div className={style.icons}>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0,224L48,202.7C96,181,192,139,288,117.3C384,96,480,96,576,117.3C672,139,768,181,864,197.3C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
              </svg>
              contacto@greattravel.com
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
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
                className="bi bi-house-door-fill"
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
          fillOpacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,117.3C384,96,480,96,576,117.3C672,139,768,181,864,197.3C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Contacts;
