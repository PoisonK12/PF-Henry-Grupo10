import React, { useState, useEffect, useRef } from "react";
import style from "./PropertyForm.module.css";
import { useNavigate } from "react-router";
import { Carousel, Modal, Button } from "react-bootstrap";
import {
  createAsset,
  getAmenities,
  getCountries,
  getStates,
} from "../../redux/actions";
import Card from "../../components/Card/CardOffer/CardOffer";
import validation from "./Validation";
import axios from "axios";
import fondo from "../../assets/images/Exteriores/Image2.jpg";
import { useDispatch, useSelector } from "react-redux";
import helicopter from "../../assets/helicopter.mp3"

const PropertyForm = () => {
  const [modal, setModal] = useState(false);
  const [modalBody, setModalBody] = useState({ response: [], message: "" });
  const [price, setPrice] = useState(false);
  const [step, setStep] = useState(1);
  const [showCities, setShowCities] = useState(true);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries.data);
  const [states, setStates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [conditionalCreate, setConditionalCreate] = useState(false);

  const amenities = useSelector((state) => state.amenities);

  const [Checked, setChecked] = useState({
    Wifi: false,
    Cochera: false,
    Piscina: false,
    Jacuzzi: false,
    Terraza: false,
    "Dormitorio en suite": false,
    "Seguridad 24hs": false,
    GYM: false,
    Sauna: false,
    Helipuerto: false,
  });

  const [userName, setUserName] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    images: "",
    country: "",
    address: "",
    location: "",
    onSale: "",
    sellPrice: "",
    rentPrice: "",
    type: "",
    rooms: "",
    bathrooms: "",
    description: "",
    coveredArea: "",
    totalArea: "",
    reviews: "asdasdasd",
    nearby: "asd",
    averageScore: "",
    nearbyScore: "",
    userName: "",
    amenities: "",
  });
  const [selectedCkeckbox, setSelectedCheckbox] = useState({
    Wifi: "",
    Cochera: "",
    Piscina: "",
    Jacuzzi: "",
    Terraza: "",
    "Dormitorio en suite": "",
    "Seguridad 24hs": "",
    GYM: "",
    Sauna: "",
    Helipuerto: "",
  });

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    images: [],
    country: "",
    address: "",
    location: "",
    onSale: false,
    sellPrice: 0,
    rentPrice: 0,
    type: "",
    rooms: "",
    bathrooms: "",
    description: "",
    coveredArea: "",
    totalArea: "",
    reviews: "asdasdasd",
    nearby: "asd",
    averageScore: "",
    nearbyScore: "",
    userName: "",
    amenities: [],
  });

  useEffect(() => {
    const setearName = () => {
      const data = localStorage.getItem("data");
      if (data) {
        const jsonData = JSON.parse(data);
        console.log("jalo", jsonData);
        const userNames = jsonData.userName;
        setForm({ ...form, userName: userNames });
        console.log("Neiim", userNames);
      } else {
        console.log("no hay data");
      }
    };
    setearName();
  }, []);

  useEffect(() => {
    dispatch(getAmenities());
  }, []);

  const handleSellPrice = (e) => {
    const { checked } = e.target;
    setPrice(checked);
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
    if (!file.type.includes("image")) {
      setErrors({ ...errors, images: "Solo puedes subir imagenes" });
      return;
    } else {
      setErrors({ ...errors, images: "" });

      const fileData = new FormData();
      fileData.append("file", file);
      fileData.append("upload_preset", "Imagenes");
      fileData.append("cloud_name", "dkdounmsa");
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dkdounmsa/image/upload`,
        fileData
      );
      console.log(data);
      setForm({ ...form, images: [...form.images, data.secure_url] });
      setSelectedIndex(form.images.length);
      console.log(form.images);
    }
  };

  const handleDelete = (index, e) => {
    e.preventDefault;
    const updatedImages = form.images.filter((ele, i) => i !== index);
    setForm({ ...form, images: updatedImages });

    if (selectedIndex === form.images.length - 1) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleSelect = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  const handleStep = (e) => {
    if (e.target.value === "prev") {
      setStep(step - 1);
      setErrors({
        name: "",
        images: "",
        country: "",
        address: "",
        location: "",
        onSale: "",
        sellPrice: "",
        rentPrice: "",
        type: "",
        rooms: "",
        bathrooms: "",
        description: "",
        coveredArea: "",
        totalArea: "",
        reviews: "asdasdasd",
        nearby: "asd",
        averageScore: "",
        nearbyScore: "",
        userName: "",
        amenities: "",
      });
      return;
    } else if (e.target.value === "next") {
      const errorDetect = validation(form, step);
      setErrors(errorDetect);
      console.log("error", errorDetect);
      if (Object.keys(errorDetect).length === 0) {
        setStep(step + 1);
        return;
      }
    }
  };
  console.log(step);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "country" && value == "default") {
      return;
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

  const handleCkecked = (e) => {
    const { name } = e.target;
    const { checked } = e.target;
    const { value } = e.target;
    if(name === "Helipuerto"){
      const audioElement = document.getElementById("audio-element");
  audioElement.play();
    }
    setChecked({ ...Checked, [name]: checked });
    console.log(Checked);
    setSelectedCheckbox({ ...selectedCkeckbox, [name]: checked ? value : "" });
    const push = Object.values(selectedCkeckbox).map((ele) => Number(ele));
    const amenities = push.filter((ele) => ele !== 0);
    setForm({ ...form, amenities: amenities });
    console.log(form);
  };

  //!------------------------handleForm----------------------------------
  const handleForm = async (e) => {
    e.preventDefault();
    console.log("hola");
    const push = Object.values(selectedCkeckbox).map((ele) => Number(ele));
    const amenities = push.filter((ele) => ele !== 0);
    setForm({ ...form, amenities: amenities });

    setErrors(validation({ ...form }));
    if (form.amenities.length === 0) {
      return;

      /*  setErrors(validation({ ...form }));

    const step3 = Object.values({ amenities: errors.amenities });

    console.log(errors);

    if (step3.some((error) => typeof error === "string")) {
      return; */
    } else {
      setModalBody({ response: form });
      setModal(true);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    await createAsset(
      form,
      setModal,
      setModalBody,
      navigate,
      setStep,
      setConditionalCreate
    );
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setModal(false);
    setStep(1);
  };

  console.log({ modal: modal, modalbody: modalBody });

  useEffect(() => {}, [step]);
  useEffect(() => {
    dispatch(getCountries());
    setVisible(true);
  }, []);

  const handlerState = async (e) => {
    const { value, name } = e.target;
    const stateSave = {
      country: e.target.value.toLowerCase(),
    };
    const { data } = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      stateSave
    );

    const noProvince = data.data.states.map((ele) => {
      const keywordsToRemove = [
        "Province",
        "Department",
        "Governorate",
        "Region",
        "District",
      ];
      let modifiedName = ele.name;

      // Verificar si el nombre del estado contiene alguna palabra clave y eliminarla
      for (const keyword of keywordsToRemove) {
        if (ele.name.includes(keyword)) {
          modifiedName = modifiedName.replace(keyword, "").trim();
          break; // Solo eliminamos la primera coincidencia
        }
      }

      return modifiedName;
    });

    if (name == "country") {
      setForm({ ...form, location: "", country: value });
    }

    if (noProvince.length === 0) {
      setForm({ ...form, location: "" });
      setErrors({ ...errors, location: "No hay localidades para este pais" });
    }
    setStates(noProvince);

    setShowCities(noProvince.length === 0);
  };

  console.log(conditionalCreate);
  const MultiForm = (e) => {
    if (step === 1) {
      return (
        <div class="justify-content-center align-items-center d-flex flex-column text-center ">
          <form
            className={`d-flex flex-row align-items-center justify-content-center text-center mt-5`}
          >
            <fieldset className={`p-5 d-flex flex-column ${style.fieldset} `}>
              <div>
                <h3 className=" display-6 ">
                  {" "}
                  Paso {step} Agrega un nuevo alojamiento...
                </h3>
              </div>
              <div
                className={`d-flex flex-row justify-content-center align-items-center ${style.formmer}`}
              >
                <div>
                  <div
                    className={`d-flex text-center justify-content-center align-items-center ${style.divDrop}`}
                    style={{
                      background: "rgba(169, 181, 197, 0.562)",
                      margin: `50px 40px 20px 0px`,
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
                        activeIndex={selectedIndex}
                        onSelect={handleSelect}
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: "250px",
                        }}
                      >
                        {form.images?.map((imageUrl, index) => (
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
                            ></img>

                            <button
                              className={`${style.buton}`}
                              onClick={(e) => handleDelete(index, e)}
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
                  <div>
                    {errors.images ? (
                      <p
                        style={{
                          color: "red",
                          visibility: "visible",
                          margin: "10px",
                          marginRight: "50px ",
                          marginBottom: "15px",
                        }}
                      >
                        {errors.images}
                      </p>
                    ) : (
                      <p style={{ visibility: "hidden" }}>&nbsp;</p>
                    )}
                    <label className={style.label} htmlFor="imageInput">
                      Selecciona un archivo
                    </label>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      className={style.inputfile}
                      onChange={(e) => handleFile(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className={style.formContainer}>
                  <div className="d-flex space-between">
                    <div className=" text-center m-2">
                      <label htmlFor="inputName" className="form-label ">
                        Propiedad
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
                      {errors.name ? (
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.name}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
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
                      {errors.address ? (
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.address}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
                    </div>
                  </div>

                  <div className={style.selects}>
                    <div>
                      <label htmlFor="inputAddress2" className="form-label">
                        Pais
                      </label>
                      <select
                        onChange={(e) => {
                          handleChange(e);
                          handlerState(e);
                        }}
                        value={form.country}
                        name="country"
                        className="form-select"
                      >
                        <option name="country">Seleccione un pais</option>
                        {allCountries?.map((ele) => {
                          return (
                            <option name="country" value={ele.country}>
                              {ele.country}
                            </option>
                          );
                        })}
                      </select>

                      {errors.country ? (
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.country}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
                    </div>
                    <div className={""}>
                      <label htmlFor="inputCity" className="form-label">
                        Locación
                      </label>
                      <select
                        disabled={showCities}
                        onChange={(e) => handleChange(e)}
                        value={form.location}
                        name="location"
                        className="form-select"
                      >
                        <option name="location">Seleccione una ciudad</option>
                        {states?.map((ele) => {
                          return (
                            <option name="location" value={ele}>
                              {ele}
                            </option>
                          );
                        })}
                      </select>
                      {errors.location ? (
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.location}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-1">
                <button
                  style={{ marginLeft: "340px" }}
                  type="button"
                  value="next"
                  className={`ml-4 ${style.button}`}
                  onClick={(e) => handleStep(e)}
                >
                  Continuar
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      );
    } else if (step === 2) {
      return (
        <div class="justify-content-center align-items-center d-flex flex-column text-center ">
          <form className=" d-flex flex-row align-items-center justify-content-center text-center mt-5">
            <fieldset className={`p-1 d-flex flex-column ${style.fieldset} `}>
              <h3 className=" display-6 mb-5 fw-bold">
                Agrega sus características{" "}
              </h3>
              <div className={`${style.gridForm}`}>
                <div className={`${style.inputForm}`}>
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
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.rooms}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
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
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.bathrooms}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
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
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.totalArea}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="inputArea" className="form-label">
                      Mt² cubiertos
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
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.coveredArea}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column ">
                    <div className="form-check form-switch">
                      <label className="form-check-label" htmlFor="onSale">
                        {" "}
                        Esta a la venta ?{" "}
                      </label>{" "}
                      <input
                        type="checkbox"
                        onChange={handleSellPrice}
                        name="onSale"
                        className="form-check-input"
                      ></input>
                    </div>
                    {price ? (
                      <div>
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
                    ) : null}
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
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.rentPrice}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
                    </div>
                  </div>

                  <div>
                    {errors.sellPrice ? (
                      <p
                        style={{
                          color: "red",
                          visibility: "visible",
                          marginBottom: "0",
                        }}
                      >
                        {errors.sellPrice}
                      </p>
                    ) : (
                      <p style={{ visibility: "hidden" }}>&nbsp;</p>
                    )}
                  </div>
                </div>
                <fieldset className={`border p-3  ${style.fieldset2}`}>
                  <label htmlFor="description" className="form-label">
                    {" "}
                    Descripción
                  </label>
                  <div className="form-group  ">
                    <textarea
                      className="form-control"
                      value={form.description}
                      rows="8"
                      style={{
                        padding: "50px",
                        resize: "none",
                        background: "rgb(230, 233, 237)",
                      }}
                      cols="5"
                      name="description"
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                    <div>
                      {errors.description ? (
                        <p
                          style={{
                            color: "red",
                            visibility: "visible",
                            marginBottom: "0",
                          }}
                        >
                          {errors.description}
                        </p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>&nbsp;</p>
                      )}
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="d-flex  flex-row justify-content-center align-items-center"></div>
              <div className="col-md-3 container d-flex flex-column ">
                <div
                  className={`d-flex  flex-row align-items-center justify-content-around mt-4 ${style.buttonFor2}`}
                >
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
                      type="button"
                      className={`ml-4 ${style.button}`}
                      value="next"
                      onClick={(e) => handleStep(e)}
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
              <div className="column m-3"></div>
            </fieldset>
          </form>
        </div>
      );
    } else if (step === 3) {
      return (
        <form
          className="d-flex flex-column align-items-center  text-center"
          onSubmit={handleForm}
        >
          <fieldset className={`border ${style.fieldset3} `}>
            <div>
              <h2 className=" display-6 mt-3 fw-bold"> ESPECIFICACIONES </h2>
            </div>
            <hr></hr>
            {/* <img src="https://icons8.com/icon/1786/barbell"></img> */}
            <div
              className="justify-content-center "
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {amenities?.map((e) => {
                // console.log(e)
                return (
                  <div className="form-check m-3" style={{}}>
                    <img width={40} src={e.svg}></img>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "15px",
                      }}
                    >
                      <label
                        className="form-label"
                        style={{ margin: "auto 0", marginRight: "15px" }}
                      >
                        {e.name}
                      </label>
                      <label className={style.switch}>
                        <input
                          onChange={(e) => handleCkecked(e)}
                          type="checkbox"
                          name={e.name}
                          style={{}}
                          className={style.checkBox}
                          checked={Checked.name}
                          value={e.id}
                          // style={{ width: "15px" }}
                        ></input>
                        <span className={style.slider}></span>
                      </label>
                    </div>
                  </div>
                );
              })}
              <audio id="audio-element" controls style={{ display: "none" }}>
                <source src={helicopter} type="audio/mp3" />
              </audio>
              {/* <div className="d-flex flex-column justify-content-start align-items-start m-4">
                <div className="form-check m-3 form-switch">
                  <label className="form-check-label"> Wifi ? {""}</label>
                  <input
                    type="checkbox"
                    name="Wifi"
                    className="form-check-input"
                    value={1}
                    onChange={handleCkecked}
                    checked={Checked.Wifi}
                  ></input>
                </div>
                <div className="form-check  m-3">
                  <label className="form-check-label">Terraza ?</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Terraza"
                    onChange={handleCkecked}
                    checked={Checked.Terraza}
                    value="6"
                  ></input>
                </div>

                <div className="form-check  m-3 ">
                  <label className="form-check-label">GYM ? {""}</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="GYM"
                    onChange={handleCkecked}
                    checked={Checked.GYM}
                    value="13"
                  ></input>
                </div>
                <div className="form-check  m-3 ">
                  <label className="form-label">Seguridad 24hs ? {""}</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Seguridad 24hs"
                    onChange={handleCkecked}
                    checked={Checked["Seguridad 24hs"]}
                    value="11"
                  ></input>
                </div>

                <div className="form-check  m-3 ">
                  <label className="form-label">Cochera ? {""}</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Cochera"
                    onChange={handleCkecked}
                    checked={Checked.Cochera}
                    value="3"
                  ></input>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-start align-items-start m-4">
                <div className="form-check  m-3">
                  <label className="form-label">Helipuerto ?</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Helipuerto"
                    onChange={handleCkecked}
                    checked={Checked.Helipuerto}
                    value="69"
                  ></input>
                </div>

                <div className="form-check  m-3">
                  <label className="form-label">
                    Dormitorio en suite ? {""}
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Dormitorio en suite"
                    onChange={handleCkecked}
                    checked={Checked["Dormitorio en suite"]}
                    value="8"
                  ></input>
                </div>
                <div className="form-check  m-2 ">
                  <label htmlFor="wifi" className="form-label">
                    Sauna ?
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Sauna"
                    onChange={handleCkecked}
                    checked={Checked.Sauna}
                    value="14"
                  ></input>
                </div>

                <div className="form-check  m-3">
                  <label className="form-label">Jacuzzi ?</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Jacuzzi"
                    onChange={handleCkecked}
                    checked={Checked.Jacuzzi}
                    value="5"
                  ></input>
                </div>
                <div className="form-check  m-2 ">
                  <label htmlFor="wifi" className="form-label">
                    Piscina ?
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Piscina"
                    onChange={handleCkecked}
                    checked={Checked.Piscina}
                    value="4"
                  ></input>
                </div>
              </div> */}
            </div>
            <div>
              {errors.amenities ? (
                <p
                  style={{
                    color: "red",
                    visibility: "visible",
                    marginBottom: "0",
                  }}
                >
                  {errors.amenities}
                </p>
              ) : (
                <p style={{ visibility: "hidden" }}>&nbsp;</p>
              )}
            </div>
            <iv></iv>
            <hr></hr>
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
      {modal && typeof modalBody === "string" ? (
        <div className={style.container2}>
          <img
            src={fondo}
            className={`${style.imageForm} ${style["formulario-entrada"]} ${
              visible ? style["formulario-visible"] : ""
            }`}
          ></img>

          <Modal show={modal} centered>
            <Modal.Header
              className="d-flex justify-content-center "
              closeButton
            >
              <Modal.Title className="text-success text-danger">
                {" "}
                Algo salió mal ❌{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="w-auto">
              <div class="d-flex flex-column justify-content-center align-items-center">
                <h5>Esa propiedad ya existe</h5>
                <h6>Intentalo de nuevo!</h6>
                <p>Elige otro nombre</p>
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      ) : modal && typeof modalBody.response === "object" ? (
        <div className={style.container2}>
          <Modal show={modal} centered style={{}}>
            <Modal.Header className="d-flex justify-content-center ">
              <Modal.Title className="text-success">
                {conditionalCreate === false
                  ? "Un paso mas ✅"
                  : "Creado con éxito ✅"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="w-auto">
              {conditionalCreate === false ? (
                <Card
                  name={modalBody.response.name}
                  description={modalBody.response.description}
                  address={modalBody.response.address}
                  location={modalBody.response.location}
                  country={modalBody.response.country}
                  images={modalBody.response.images[0]}
                  id={modalBody.response.id}
                  total={modalBody.response.rentPrice}
                ></Card>
              ) : (
                <div>
                  <h6>Felicidadess!</h6>
                  <p> Has creado una nueva propiedad! </p>
                  <p> Ahora todos podrán verla </p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer class="d-flex flex-row justify-content-center align-items-center">
              <div class="m-3 row justify-content-center">
                <div class="col-md-6">
                  <Button onClick={handleCreate}>Crear</Button>
                </div>

                <div class="col-md-6">
                  <Button onClick={handleEdit}>Editar</Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div className={style.container}>
          <img
            src={fondo}
            className={`${style.imageForm} ${style["formulario-entrada"]} ${
              visible ? style["formulario-visible"] : ""
            }`}
          ></img>
          <div style={{ flex: "1", padding: "20px" }}>{MultiForm()}</div>
        </div>
      )}
    </>
  );
};

export default PropertyForm;
