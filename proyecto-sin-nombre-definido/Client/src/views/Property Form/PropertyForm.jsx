import React, { useState, useEffect, useRef } from "react";
import style from "./PropertyForm.module.css";
import { useNavigate } from "react-router";
import { Carousel, Modal } from "react-bootstrap";
import { createAsset, getCountries, getStates } from "../../redux/actions";
import Card from "../../components/Card/CardOffer/CardOffer";
import validation from "./Validation";
import axios from "axios";
import fondo from "../../assets/images/Exteriores/Image2.jpg";
import { useDispatch, useSelector } from "react-redux";

const PropertyForm = () => {
  const ref = useRef(null);
  const [modal, setModal] = useState(false);
  const [modalBody, setModalBody] = useState({ response: [] });
  const [price, setPrice] = useState(false);
  const [step, setStep] = useState(1);
  const [showCities, setShowCities] = useState(false)
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries.data);
  const [states, setStates] = useState([])
 

  const [errors, setErrors] = useState({
    name: "",
    location: "",
    country: "",
    address: "",
    bathrooms: "",
    rooms: "",
    images: "",
    totalArea: "",
    coveredArea: "",
    sellPrice: "",
    rentPrice: "",
    description: "",
    errorsBack: [],
  });
  const [selectedCkeckbox, setSelectedCheckbox] = useState({
    onSale: "",
    parking: "",
    terrace: "",
  });

  console.log(errors);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    images: [],
    country: "",
    address: "",
    location: "",
    onSale: false,
    sellPrice: undefined,
    rentPrice: undefined,
    type: "",
    rooms: undefined,
    bathrooms: undefined,
    description: "",
    parking: false,
    terrace: false,
    coveredArea: undefined,
    totalArea: undefined,
    reviews: "asdasdasd",
    nearby: "asd",
    nearbyScore: 1,
    amenities: [1, 2, 3],
  });

  console.log(form);
  if (modal && Array.isArray(modalBody.response)) console.log(true);

  const handleCheckbox = (e) => {
    if (e.target.name === "onSale" && e.target.value === "true") {
      setPrice(true);
    } else if (e.target.name === "onSale" && e.target.value === "false") {
      setPrice(false);
    }
    
    setSelectedCheckbox({
      ...selectedCkeckbox,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el evento de soltar la imagen
  const handleDrop = (event) => {
    event.preventDefault();
    if (form.images.length === 3) {
      setErrors({ ...errors, images: "Solo puedes tres imagenes" });
      setTimeout(() => {
        handle();
      }, 1000);
      return;
    }

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };
  function handle() {
    setErrors({ ...errors, images: undefined });
  }

  // Función para manejar el archivo seleccionado
  const handleFile = async (file) => {
    console.log(file);
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("upload_preset", "Imagenes");
    fileData.append("cloud_name", "dkdounmsa");
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/dkdounmsa/image/upload`,
      fileData
    );
    setForm({ ...form, images: [...form.images, data.secure_url] });
  };

  const handleDelete = (index, number) => {
    setForm({ ...form, images: form.images.filter((ele) => ele !== index) });
    if (ref.current || ref.current === 0) {
      ref.current.carousel(number);
    }
  };

  const handleStep = (e) => {
    if (errors.length) {
      disabled();
    }

    e.preventDefault();

    if (e.target.value === "prev") {
      setStep(step - 1);
      console.log(step);
      return;
    }

    if (step === 1) {
      setErrors(validation({ ...form }));
      const step1 = Object.values({
        images: errors.images,
        name: errors.name,
        location: errors.location,
        country: errors.country,
        address: errors.address,
      });
      console.log(step1);
      if (step1.some((error) => typeof error === "string")) {
        return;
      }
    }

    if (step === 2) {
      const step2 = Object.values({
        bathrooms: errors.bathrooms,
        rooms: errors.rooms,
        totalArea: errors.totalArea,
        coveredArea: errors.coveredArea,
        rentPrice: errors.rentPrice,
        sellPrice: errors.sellPrice,
      });
      console.log(step2);
      if (step2.some((error) => typeof error === "string")) {
        return;
      }
    }

    if (step === 3) {
      const step3 = Object.values({ description: errors.description });
      console.log(step3);
      if (step3.some((error) => typeof error === "string")) {
        return;
      }
    }

    setStep(step + 1);

    return;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const errorDetect = validation({ [name]: value });
    setErrors((prevError) => ({
      ...prevError,
      [name]: errorDetect[name],
    }));

    if(name === "country" && value == "default"){
      return
    }

    if (type === "number") {
      setForm({ ...form, [name]: Number(value) });
      return;
    }

    if (type === "checkbox") {
      setForm({ ...form, [name]: JSON.parse(value) });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    await createAsset(
      form,
      setModal,
      setModalBody,
      setErrors,
      errors,
      navigate
    );

    if (typeof modalBody.response === "string") {
      return setTimeout(() => {
        setModal(false);
        setStep(1);
      }, 1000);
    }

    if (Array.isArray(modalBody.response)) {
      return setTimeout(() => {
        setModal(false);
        setStep(1);
      }, 1000);
    } else if (typeof modalBody.response === "object") {
      return setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  };

  console.log({ modal: modal, modalbody: modalBody.response });

  useEffect(() => {
  }, [step]);
  useEffect(() =>{
    dispatch(getCountries());

  }, [])  
  
  const handlerState = async (e) =>{

    if(!states.length){
      setShowCities(true)
    }
      setShowCities(false)
    




    const stateSave = {
      country: e.target.value.toLowerCase()
    }
    const {data} = await axios.post("https://countriesnow.space/api/v0.1/countries/states", stateSave)

    const noProvince = data.data.states.map((ele) =>{
      if(ele.name.includes("Province") || ele.name.includes("Department")){
        return ele.name.split(" ").shift()
      }
      return ele.name
    })

    setStates(noProvince)
    console.log(noProvince)

    
  }


  const MultiForm = (e) => {
    if (step === 1) {
      return (
        <form
          className={`d-flex flex-row align-items-center justify-content-center text-center`}
        >
          <fieldset className={`p-5 d-flex flex-column ${style.fieldset} `}>
            <h3 className="m-3 display-6"> Agrega una nueva propiedad </h3>
            <div
              className={`d-flex flex-row justify-content-center align-items-center ${style.formmer}`}
            >
              <div>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                <div
                  className={`d-flex text-center justify-content-center align-items-center ${style.divDrop}`}
                  style={{
                    border: "2px dashed #ccc",
                    margin: `20px 20px`,
                    textAlign: "center",
                    width: "300px",
                    height: "250px",
                  }}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {form.images.length > 0 ? (
                    <Carousel
                      ref={ref}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "250px",
                      }}
                    >
                      {form?.images?.map((imageUrl, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className={style.carouselImage}
                            style={{
                              height: "245px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                            src={imageUrl}
                            alt={`Image ${index}`}
                          />
                          <button
                            className={`${style.buton}`}
                            onClick={() => handleDelete(imageUrl, 0)}
                          >
                            X
                          </button>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-card-image"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                      </svg>
                      <br></br>
                      Arrastra o haga click{" "}
                      <span
                        className={style.click}
                        onClick={() =>
                          document.getElementById("imageInput").click()
                        }
                      >
                        {" "}
                        aquí
                      </span>
                      !
                    </div>
                  )}
                </div>
                {errors.images && (
                  <p style={{ color: "red" }}>{errors.images}</p>
                )}
              </div>
              <div className={style.formContainer}>
                <div className="d-flex space-between">
                  <div className=" text-center m-2">
                    <label htmlFor="inputName" className="form-label ">
                      Nombre de la propiedad
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      className="form-control mb-1"
                      id="inputName"
                      onChange={(e) => handleChange(e)}
                      placeholder="Nombre de tu propiedad"
                    />
                    {errors.name && (
                      <span style={{ color: "red" }}>{errors.name}</span>
                    )}
                  </div>

                  <div className=" m-2 ">
                    <label htmlFor="inputAddress" className="form-label ">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      className="form-control "
                      id="inputAddress"
                      placeholder="1234 Main St"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    {errors.address && (
                      <span style={{ color: "red" }}>{errors.address}</span>
                    )}
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-around align-items-center">
                  <div className=" m-2 ">
                    <label htmlFor="inputAddress2" className="form-label">
                      Pais
                    </label>
                    <select
                      onChange={(e) => {handleChange(e); handlerState(e) }}
                      value={form.country}
                      name="country"
                      className="form-select"
                    >
                      <option name="country" value="default">Seleccione un pais</option>
                      {allCountries?.map((ele) => {
                        return <option name="country" value={ele.country}>{ele.country}</option>
                      })}
                    </select>
                    
                    {errors.country && (
                      <span style={{ color: "red" }}>{errors.country}</span>
                    )}
                  </div>
                  <div className=" m-2  ">
                    <label htmlFor="inputCity" className="form-label">
                      Locación
                    </label>
                    <select  disabled={showCities} onChange={(e) => handleChange(e)} value={form.location} name="location"className="form-select">
                      <option name="location">Seleccione una ciudad</option>
                      {states?.map((ele) => {
                        return <option name="location" value={ele}>{ele}</option>
                      })}
                    </select>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      className="form-control"
                      id="inputCity"
                      onChange={(e) => handleChange(e)}
                      placeholder="Cuidad"
                      required
                    />
                    {errors.location && (
                      <span style={{ color: "red" }}>{errors.location}</span>
                    )}
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button
                type={step === 3 ? "submit" : "button"}
                className={`ml-4 ${style.button}`}
                onClick={(e) => handleStep(e)}
              >
                Continuar
              </button>
            </div>
          </fieldset>
        </form>
      );
    } else if (step === 2) {
      return (
        <form className="d-flex flex-row align-items-center justify-content-center text-center">
          <fieldset className={`p-5 d-flex flex-column ${style.fieldset} `}>
            <h2 className="mb-3 mt-3 ">Agrega sus características </h2>
            <div className={style.gridForm}>
              <div className={`${style.inputForm}`}>
                <div className="">
                  <label htmlFor="inputState" className="form-label">
                    Tipo de propiedad
                  </label>

                  <select
                    id="inputState"
                    onChange={(e) => handleChange(e)}
                    value={form.type}
                    name="type"
                    className="form-select"
                  >
                    <option>Elije uno...</option>
                    <option name="type" value="Departamento">
                      Departamento
                    </option>
                    <option name="type" value="Casa">
                      Casa
                    </option>
                    <option name="type" value="Hotel">
                      Hotel
                    </option>
                  </select>
                </div>

                <div className="">
                  <label htmlFor="inputHab" className="form-label">
                    N° de habitaciones
                  </label>
                  <input
                    type="number"
                    name="rooms"
                    min="0"
                    value={form.rooms}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    id="inputHab"
                    required
                  />
                  <div>
                    {errors.rooms ? (
                      <p style={{ color: "red" }}>{errors.rooms}</p>
                    ) : null}
                  </div>
                </div>

                <div className="">
                  <label htmlFor="inputBaño" className="form-label">
                    N° de baños
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    min="0"
                    value={form.bathrooms}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    id="inputBaño"
                    required
                  />
                  <div>
                    {errors.bathrooms ? (
                      <p style={{ color: "red" }}>{errors.bathrooms}</p>
                    ) : null}
                  </div>
                </div>
                <div className="">
                  <label htmlFor="inputArea" className="form-label">
                    Mt²
                  </label>
                  <input
                    type="number"
                    name="coveredArea"
                    min="0"
                    value={form.coveredArea}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    id="inputArea"
                    required
                  />
                  <div>
                    {errors.coveredArea ? (
                      <p style={{ color: "red" }}>{errors.coveredArea}</p>
                    ) : null}
                  </div>
                </div>

                <div className="">
                  <label htmlFor="inputCoveredArea" className="form-label">
                    Mt² totales{" "}
                  </label>
                  <input
                    type="number"
                    name="totalArea"
                    min="0"
                    value={form.totalArea}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    id="inputCoveredArea"
                    required
                  />
                  <div>
                    {errors.totalArea ? (
                      <p style={{ color: "red" }}>{errors.totalArea}</p>
                    ) : null}
                  </div>
                </div>
                <div className="">
                  <label htmlFor="inputPriceR" className="input-label">
                    Precio de Renta
                  </label>
                  <input
                    type="number"
                    name="rentPrice"
                    min="0"
                    value={form.rentPrice}
                    id="inputPriceR"
                    className="form-control"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></input>
                  <div>
                    {errors.rentPrice ? (
                      <p style={{ color: "red" }}>{errors.rentPrice}</p>
                    ) : null}
                  </div>
                </div>
                <div className={`${price ? "d-block" : "d-none"}`}>
                  <label htmlFor="inputPriceS" className="input-label">
                    {" "}
                    Precio de Venta{" "}
                  </label>
                  <input
                    type="number"
                    id="inputPriceS"
                    value={form.sellPrice}
                    min="0"
                    name="sellPrice"
                    className=" form-control"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></input>
                </div>
              </div>
              <fieldset className={`border p-3  ${style.fieldset2}`}>
                <label className="form-label">Esta a la venta?</label>

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="onSale"
                    checked={selectedCkeckbox.onSale === "true"}
                    onChange={(e) => {
                      handleCheckbox(e);
                      handleChange(e);
                    }}
                    className="form-check-input"
                    id="checkbox1"
                    value="true"
                  />
                  <label htmlFor="checkbox1" className="form-check-label">
                    {" "}
                    YES
                  </label>
                </div>

                <div className="form-check ">
                  <input
                    type="checkbox"
                    name="onSale"
                    checked={selectedCkeckbox.onSale === "false"}
                    onChange={(e) => {
                      handleCheckbox(e);
                      handleChange(e);
                    }}
                    className="form-check-input"
                    id="checkbox2"
                    value="false"
                  />
                  <label htmlFor="checkbox2" className="form-check-label">
                    NO{" "}
                  </label>
                </div>

                <hr></hr>
                <label htmlFor="inputPark" className="form-label">
                  Posee estacionamiento?
                </label>

                <div className="form-check">
                  <label htmlFor="inputPark" className="form-check-label">
                    {" "}
                    SI{" "}
                  </label>
                  <input
                    type="checkbox"
                    name="parking"
                    className="form-check-input"
                    id="inputPark"
                    onChange={(e) => {
                      handleCheckbox(e);
                      handleChange(e);
                    }}
                    value="true"
                    checked={selectedCkeckbox.parking === "true"}
                  />
                </div>

                <div className="form-check">
                  <label htmlFor="inputPark" className="form-check-label">
                    {" "}
                    NO{" "}
                  </label>
                  <input
                    type="checkbox"
                    name="parking"
                    className="form-check-input"
                    id="inputPark"
                    value="false"
                    onChange={(e) => {
                      handleCheckbox(e);
                      handleChange(e);
                    }}
                    checked={selectedCkeckbox.parking === "false"}
                  />
                </div>
                <hr></hr>

                <label htmlFor="inputTer" className="form-label">
                  Posee terraza?
                </label>

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="terrace"
                    className="form-check-input"
                    id="inputTer"
                    value="true"
                    onChange={(e) => {
                      handleCheckbox(e);
                      handleChange(e);
                    }}
                    checked={selectedCkeckbox.terrace === "true"}
                  ></input>
                  <label htmlFor="inputTer" className="form-check-label">
                    {" "}
                    YES{" "}
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="terrace"
                    className="form-check-input"
                    id="inputTer"
                    value="false"
                    onChange={(e) => {
                      handleCheckbox(e);
                      handleChange(e);
                    }}
                    checked={selectedCkeckbox.terrace === "false"}
                  ></input>
                  <label htmlFor="inputTer" className="form-check-label">
                    {" "}
                    NO
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="d-flex  flex-row justify-content-center align-items-center"></div>
            <div className="col-md-3 container d-flex flex-column ">
              <div className=" d-flex flex-row align-items-center justify-content-around mt-4 ">
                <div className="m-2 ">
                  <button
                    type="button"
                    className={style.button}
                    value="prev"
                    onClick={(e) => handleStep(e)}
                  >
                    Atras
                  </button>
                </div>

                <div className="m-2">
                  <button
                    type={step === 3 ? "submit" : "button"}
                    className={`ml-4 ${style.button}`}
                    value="next"
                    onClick={(e) => handleStep(e)}
                  >
                    {step === 3 ? "Agregar" : "Continuar"}
                  </button>
                </div>
              </div>
            </div>
            <div className="column m-3"></div>
          </fieldset>
        </form>
      );
    } else if (step === 3) {
      return (
        <form
          className="d-flex flex-column align-items-center  text-center"
          onSubmit={handleForm}
        >
          <fieldset className={`border p-4  m-5 ${style.fieldset} `}>
            <legend className="mb-3 mt-3"> Especificaciones </legend>
            <hr></hr>

            <hr></hr>
            <div className="d-flex  text-center  mt-4 m-5">
              <div className="form-group ">
                <label htmlFor="description" className="form-label">
                  {" "}
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  value={form.description}
                  rows="6"
                  cols="50"
                  name="description"
                  onChange={(e) => handleChange(e)}
                ></textarea>
                <div>
                  {errors.description ? (
                    <p style={{ color: "red" }}>{errors.description}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-3 container d-flex flex-column ">
              <div className=" d-flex flex-row align-items-center justify-content-around mt-2 ">
                <div className="m-3 ">
                  <button
                    type="button"
                    className={style.button}
                    value="prev"
                    onClick={(e) => handleStep(e)}
                  >
                    Atras
                  </button>
                </div>

                <div className="m-3">
                  <button
                    type="submit"
                    className={`ml-4 ${style.button}`}
                    value="submit"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      );
    }
  };

  return (
    <>
      {modal && Array.isArray(modalBody.response) ? (
        <div className={style.container2}>
          <br></br>
          <br></br>

          <Modal show={modal} centered>
            <Modal.Header className="d-flex justify-content-center ">
              <Modal.Title className="text-success text-danger">
                {" "}
                Algo salió mal ❌{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="w-auto">Intenta de nuevo !</Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      ) : modal && typeof modalBody.response === "string" ? (
        <div className={style.container2}>
          <br></br>
          <br></br>

          <Modal show={modal} centered>
            <Modal.Header className="d-flex justify-content-center ">
              <Modal.Title className="text-success text-danger">
                {" "}
                Algo salió mal ❌{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="w-auto">Esa propiedad ya existe</Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      ) : modal && typeof modalBody.response === "object" ? (
        <div className={style.container2}>
          <br></br>
          <br></br>

          <Modal show={modal} centered>
            <Modal.Header className="d-flex justify-content-center ">
              <Modal.Title className="text-success">
                Creado con éxito ✅{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="w-auto">
              {
                <Card
                  name={modalBody.response.name}
                  description={modalBody.response.description}
                  address={modalBody.response.address}
                  location={modalBody.response.location}
                  country={modalBody.response.country}
                  images={modalBody.response.images[0]}
                  id={modalBody.response.id}
                ></Card>
              }
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div className={style.container}>
          <img src={fondo} className={style.imageForm}></img>
          <div style={{ flex: "1", padding: "20px" }}>{MultiForm()}</div>
        </div>
      )}
    </>
  );
};

export default PropertyForm;
