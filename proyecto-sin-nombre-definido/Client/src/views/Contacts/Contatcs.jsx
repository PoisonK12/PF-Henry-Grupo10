import React, { useEffect } from "react";
import style from "./contacts.module.css";
import fondo from "../../assets/images/Exteriores/image12.jpeg";
import personaje from "../../assets/images/svg/contact.png"
import { useDispatch, useSelector } from "react-redux";
import { getAllReallyProperties } from "../../redux/actions";

const Contacts = () => {
  const allCount = useSelector(state => state.propertiesCopy) 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllReallyProperties())
    console.log(allCount)
  }, [])

  return (
    <div className={style.background}>
      <h1>QUIENES SOMOS?</h1>
      <img className={style.img} src={fondo}></img>
      <div className={style.cont}>
        <form className={`${style["row-cols-1"]} ${style["custom-container"]}`}>
          <h2 className={style.title}>Contacts</h2>
          <div className="mb-3 w-90 ">
            <label htmlFor="name" className="form-label ">
              Name
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
              LastName
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
              Phone
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
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3 w-90">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              style={{ resize: "none" }}
              id="message"
              name="message"
              placeholder="Enter your message here"
              rows="3"
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className={`btn w-100 btn-primary ${style.button}`}>
              Enviar
            </button>
          </div>
        </form>
        <div className={style.info}>
          
        </div>
      </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={style.svg}
          viewBox="0 0 1440 320"
        >
          <path
            fill="rgb(66, 164, 221)"
            fill-opacity="1"
            d="M0,224L48,202.7C96,181,192,139,288,117.3C384,96,480,96,576,117.3C672,139,768,181,864,197.3C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
    </div>
  );
};

export default Contacts;
