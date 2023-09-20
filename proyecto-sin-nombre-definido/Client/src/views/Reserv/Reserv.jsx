import { Link } from "react-router-dom";
import validationReserv from "./validationReserv.js";
import React, { useEffect, useState } from "react";
import { handleReserv, getPayment } from "../../redux/actions";
import { useSelector } from "react-redux";
import style from "./Reserv.module.css";

const Reserv = ({ setReserv, bookingId, booking }) => {
  const userData = JSON.parse(localStorage.getItem("data"));
  const assetData = useSelector((state) => state.detail);

  const [form, setForm] = useState({
    name: assetData.name,
    description: assetData.description,
    price: assetData.rentPrice,
    guestName: userData.fullName,
    guestPhoneNumber: userData.phoneNumber,
    checkInDate: booking.checkInDate.toISOString().split("T")[0],
    checkOutDate: booking.checkOutDate.toISOString().split("T")[0],
  });

  const [payment, setPayment] = useState(true);
  const [paymentSucess, setPaymentSuccess] = useState(false);
  const [buttonReserv, setButtonReserv] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "Card") {
      setPayment(false);
      setPaymentSuccess(false);
      setButtonReserv(true);
      setForm({ ...form, [name]: value });
    } else if (value === "Cash") {
      setPayment(true);
      setPaymentSuccess(true);
      setButtonReserv(false);
    } else if (value === "") {
      setPayment(true);
      setPaymentSuccess(false);
      setButtonReserv(true);
    }
    setForm({ ...form, [name]: value });
  };

  const handleBack = () => {
    setReserv(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    // await getPayment(form, setPaymentSuccess, setButtonReserv);
    await handleReserv(bookingId);
    console.log(paymentSucess);
  };
  console.log(paymentSucess);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleReserv(bookingId);
  };

  //?-------------------Acodarse de decirle a los chicos del back apra arreglar tema rutas success/cancel------------------------------------

  return (
    <div className={style.infoAvailable}>
      <form onSubmit={handleSubmit}>
        <div className={`d-flex ${style.container}`}>
          <div className={`d-flex flex-column ${style.container1}`}>
            <legend className={style.legend}>
              {" "}
              Complete los siguientes datos
            </legend>
            <fieldset className={style.fieldsetContainer}>
              <div className={`d-flex flex-column ${style.inputContainer}`}>
                <h5>Es para tí o para alguien más ?</h5>
                <hr className={style.hr}></hr>
                <div className="m-2 d-flex flex-column form-group  text-start">
                  <label className="form-label">Nombre de inquilino :</label>
                  <input
                    type="text"
                    className={`form-control ${style.input}`}
                    name="guestName"
                    value={form.guestName}
                    onChange={handleChange}
                    placeholder="Escriba el nombre del inquilino"
                  ></input>
                </div>
                <div className="m-2 d-flex flex-column form-group text-start">
                  <label>Numero del teléfono</label>
                  <input
                    type="text"
                    className={`form-control ${style.input}`}
                    name="guestPhoneNumber"
                    value={form.guestPhoneNumber}
                    onChange={handleChange}
                    placeholder="Escriba el núm de telefono"
                  ></input>
                </div>
                <div className="m-2 d-flex flex-row form-group text-start">
                  <div>
                    <label htmlFor="caldendar1" className="form-label">
                      Fecha de ingreso :{" "}
                    </label>
                    <input
                      id="caldendar1"
                      type="date"
                      className={`form-control ${style.input}`}
                      value={form.checkInDate}
                      disabled
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="calendar2" className="form-label">
                      Fecha de salida :
                    </label>
                    <input
                      id="calendar2"
                      type="date"
                      className={`form-control ${style.input}`}
                      value={form.checkOutDate}
                      disabled
                    ></input>
                  </div>
                </div>
                <div className="m-2 d-flex flex-column form-group text-start">
                  <span> Elige una forma de pago : </span>
                  <select
                    name="paymentMethod"
                    className={`form-control ${style.input}`}
                    value={form.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value=""> --Selecciona una forma de pago--</option>
                    <option value="Card"> Tarjeta</option>
                    <option value="Cash"> Efectivo</option>
                  </select>
                </div>
                <hr className={style.hr}></hr>
                <div
                  className="col-md-12 "
                  style={{ marginTop: "20px", marginBottom: "30px" }}
                >
                  <span className="m">Paga con Stripe </span>
                  <button
                    class={`btn ${style.button}`}
                    style={{ marginLeft: "10px" }}
                    type="button"
                    onClick={(e) => handlePayment(e)}
                    disabled={payment}
                  >
                    <svg
                      className={style.svg}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width="40"
                      height="30"
                      fill="#ffffff"
                    >
                      <path
                        d="M111.328 15.602c0-4.97-2.415-8.9-7.013-8.9s-7.423 3.924-7.423 8.863c0 5.85 3.32 8.8 8.036 8.8 2.318 0 4.06-.528 5.377-1.26V19.22a10.246 10.246 0 0 1-4.764 1.075c-1.9 0-3.556-.67-3.774-2.943h9.497a39.64 39.64 0 0 0 .063-1.748zm-9.606-1.835c0-2.186 1.35-3.1 2.56-3.1s2.454.906 2.454 3.1zM89.4 6.712a5.434 5.434 0 0 0-3.801 1.509l-.254-1.208h-4.27v22.64l4.85-1.032v-5.488a5.434 5.434 0 0 0 3.444 1.265c3.472 0 6.64-2.792 6.64-8.957.003-5.66-3.206-8.73-6.614-8.73zM88.23 20.1a2.898 2.898 0 0 1-2.288-.906l-.03-7.2a2.928 2.928 0 0 1 2.315-.96c1.775 0 2.998 2 2.998 4.528.003 2.593-1.198 4.546-2.995 4.546zM79.25.57l-4.87 1.035v3.95l4.87-1.032z"
                        fill-rule="evenodd"
                      />
                      <path d="M74.38 7.035h4.87V24.04h-4.87z" />
                      <path
                        d="M69.164 8.47l-.302-1.434h-4.196V24.04h4.848V12.5c1.147-1.5 3.082-1.208 3.698-1.017V7.038c-.646-.232-2.913-.658-4.048 1.43zm-9.73-5.646L54.698 3.83l-.02 15.562c0 2.87 2.158 4.993 5.038 4.993 1.585 0 2.756-.302 3.405-.643v-3.95c-.622.248-3.683 1.138-3.683-1.72v-6.9h3.683V7.035h-3.683zM46.3 11.97c0-.758.63-1.05 1.648-1.05a10.868 10.868 0 0 1 4.83 1.25V7.6a12.815 12.815 0 0 0-4.83-.888c-3.924 0-6.557 2.056-6.557 5.488 0 5.37 7.375 4.498 7.375 6.813 0 .906-.78 1.186-1.863 1.186-1.606 0-3.68-.664-5.307-1.55v4.63a13.461 13.461 0 0 0 5.307 1.117c4.033 0 6.813-1.992 6.813-5.485 0-5.796-7.417-4.76-7.417-6.943zM13.88 9.515c0-1.37 1.14-1.9 2.982-1.9A19.661 19.661 0 0 1 25.6 9.876v-8.27A23.184 23.184 0 0 0 16.862.001C9.762.001 5 3.72 5 9.93c0 9.716 13.342 8.138 13.342 12.326 0 1.638-1.4 2.146-3.37 2.146-2.905 0-6.657-1.202-9.6-2.802v8.378A24.353 24.353 0 0 0 14.973 32C22.27 32 27.3 28.395 27.3 22.077c0-10.486-13.42-8.613-13.42-12.56z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="termCon"
                    value={form.termCon}
                    onChange={handleChange}
                  ></input>
                  <span>
                    {" "}
                    Acepto los{" "}
                    <Link to="/terms&Conditions" target="__blank" className={style.link}>
                      términos y condiciones
                    </Link>
                  </span>
                </div>
              </div>
            </fieldset>
          </div>
          <div className={`d-flex flex-column ${style.container2} `}>
            <fieldset className={` ${style.fieldsetTax} `}>
              <div className={style.divTax}>
                <div
                  className={`d-flex flex-row  justify-content-between ${style.child}`}
                >
                  <span>Precio de propiedad : </span>
                  <p style={{ marginLeft: "90px" }}> $ {assetData.rentPrice}</p>
                  <hr></hr>
                </div>
                <div
                  className={`d-flex flex-row  justify-content-between ${style.child}`}
                >
                  <label> Cantidad de húespedes </label>
                  <select style={{ background: "transparent" }}>
                    {[1, 2, 3, 4, 5].map((guest) => {
                      return <option>{guest}</option>;
                    })}
                  </select>
                </div>
                <div
                  className={`d-flex flex-row  justify-content-between ${style.child}`}
                >
                  <span> Mas un 21% de IVA </span>
                  <p>$ {(21 * assetData.rentPrice) / 100}</p>
                </div>
                <hr className={style.hr}></hr>
                <div
                  className={`d-flex flex-row  justify-content-between ${style.child}`}
                >
                  <span> Precio total : </span>
                  <p>
                    $ {assetData.rentPrice + (21 * assetData.rentPrice) / 100}
                  </p>
                </div>
              </div>

              <div style={{ width: "400px", margin: "40px 0" }}>
                {!paymentSucess ? (
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: " center",
                      marginLeft: "10px",
                      width: "400px",
                      boxShadow: "0 0 0 0.20rem rgba(255, 0, 0, 0.603) ",
                      borderRadius: "5px",
                      borderColor: "red",
                      visibility: "visible",
                      marginBottom: "0",
                    }}
                  >
                    ¡Necesitas elegir un{" "}
                    <p style={{ color: "red" }}>método de pago</p> antes de
                    continuar!
                  </p>
                ) : (
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: " center",
                      marginLeft: "40px",
                      width: "300px",
                      boxShadow: "0 0 0 0.20rem rgba(78, 212, 1, 0.671)  ",
                      borderRadius: "5px",
                      borderColor: "red",
                      visibility: "visible",
                      marginBottom: "0",
                      padding: "12px",
                    }}
                  >
                    {" "}
                    Gracias por confiar en nosotros !{" "}
                    <p>Les deseamos un feliz hospedaje 💚</p>
                  </p>
                )}
              </div>
              <div>
                <div className={style.buttons}>
                  <div>
                    <button
                      type="button"
                      class={`btn ${style.button}`}
                      onClick={handleBack}
                    >
                      ↩ Volver
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      class={`btn ${style.button}`}
                      disabled={buttonReserv}
                    >
                      {" "}
                      📑 Reservar{" "}
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reserv;
