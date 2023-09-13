import React, { useEffect, useRef, useState } from "react";
import style from "./allProperties.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  deleteAssetById,
  deleteLogicAssetById,
  getAllReallyProperties,
  putProperty,
} from "../../../redux/actions";
import axios from "axios";
import Widget from "./Balance/Balance";

const AllProperties = ({ allProperties, setProps, props }) => {
  const dispatch = useDispatch();

  console.log("sisis", allProperties);
  const [updated, setUpdated] = useState(false);
  const [price, setPrice] = useState(false);
  const [idHouse, setIdHouse] = useState("");
  const [selectedCkeckbox, setSelectedCheckbox] = useState({
    onSale: "",
    parking: "",
    terrace: "",
  });
  const [form, setForm] = useState({
    name: "",
    description: "",
    country: "",
    state: "",
    address: "",
    location: "",
    onSale: false,
    images: [],
    sellPrice: 1,
    rentPrice: 1,
    rooms: 0,
    bathrooms: 0,
    coveredArea: 0,
    totalArea: 0,
  });

  useEffect(() => {
    const getDataForFrom = async () => {
      const { data } = await axios(`/assets/` + idHouse);
      setForm({
        name: data.name,
        country: data?.country,
        state: data?.state,
        address: data?.address,
        location: data?.location,
        description: data.description,
        onSale: data.onSale,
        images: data.images,
        sellPrice: data?.sellPrice,
        rentPrice: data?.rentPrice,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
        coveredArea: data.coveredArea,
        totalArea: data.totalArea,
      });
    };
    getDataForFrom();
    console.log(form);
  }, [idHouse]);

  const [errors, setErrors] = useState({
    image: "",
  });

  //? Paginado ---------------------------------------
  const scrollToTop = () => {
   window.scrollTo({behavior:"smooth", top:0})
  };


  const [currentPage, setCurrentPage] = useState(0)
  const totalProp = Math.ceil(allProperties?.count / 10);

  const nextHandler = () => {
    scrollToTop()
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalProp - 1));
  };

  const prevHandler = () => {
    scrollToTop()
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  useEffect(() => {
    dispatch(getAllReallyProperties(props ,currentPage + 1));
  }, [currentPage, dispatch]);

  //? ---------------------------------------------------

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
  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    if (e.target.type === "checkbox") {
      setForm({ ...form, [name]: JSON.parse(value) });
      return;
    }
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };
  // Función para manejar el archivo seleccionado
  const handleFile = async (file) => {
    console.log("Imagen", file);
    const fileEdit = new FormData();
    fileEdit.append("file", file);
    fileEdit.append("upload_preset", "Imagenes");
    fileEdit.append("cloud_name", "dkdounmsa");
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/dkdounmsa/image/upload`,
      fileEdit
    );
    setForm({ ...form, images: [...form.images, data.secure_url] });
  };
  // Función para manejar el evento de soltar la imagen
  const handleDrop = (event) => {
    event.preventDefault();
    if (form.images.length === 3) {
      setErrors({ ...errors, image: "Solo puedes tres imagenes" });
      return;
    }
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };
  function handleDelete(index) {
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1); // Elimina la imagen en el índice especificado
    setForm({ ...form, images: updatedImages });
  }
  const handleUpdate = async (id) => {
    console.log("entre al handle");
    try {
      dispatch(putProperty(id, form));
    } catch (error) {
      console.log(error);
    }
  };

  const descripCut = (description) => {
    if (description.length > 220) {
      const newDesc = description
        .split("")
        .slice(0, 220)
        .join("");
      return <p className="card-text">{newDesc}...</p>;
    }
    return <p className="card-text">{description}</p>;
  };
  const handleDeleteAsset = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta propiedad?")) {
      // Llama a la acción para eliminar la propiedad por su ID
      dispatch(deleteAssetById(id));
    }
  };

  const handleLogicDelete = (id) => {
    dispatch(deleteLogicAssetById(id))
  }

  return (
    <div className={style.background}>
      <div>
        <div className={style.widgets}>
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
      </div>
      <div>
        {allProperties?.rows?.map((props, index) => (
          <div className={`${style.centeredContent}`} key={props.id}>
            <div className={`card mb-3 p-2 ${style.maxWidth}`}>
              <div className="row g-0">
                <div className="col-md-4">
                  <div
                    id={`carouselExampleIndicators-${index}`}
                    className="carousel slide"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className={`carousel-inner ${style.containerImg}`}>
                      <div className="carousel-item active">
                        <img
                          style={{
                            width: "100%",
                            height: "238px",
                            objectFit: "cover",
                            backgroundPosition: "center bottom",
                          }}
                          src={props.images[0]}
                          className="d-block "
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={props.images[1]}
                          style={{
                            width: "100%",
                            height: "238px",
                            objectFit: "cover",
                            backgroundPosition: "center bottom",
                          }}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          style={{
                            width: "100%",
                            height: "238px",
                            objectFit: "cover",
                            backgroundPosition: "center bottom",
                          }}
                          src={props.images[2]}
                          className="d-block "
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carouselExampleIndicators-${index}`}
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselExampleIndicators-${index}`}
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    {descripCut(props.description)}
                    <p className="card-text">
                      <small className="text-muted">
                        {props.address}, {props.country}
                      </small>
                    </p>
                    <div className={`  m-2 ${style.divButton}`}>
                      <Link to={`/detail/${props.id}`}>
                        <button className="btn btn-primary">
                          Ver Detalles
                        </button>
                      </Link>
                      <div className={style.left}>
                        <button
                          className={`btn btn-danger ${style.left} `}
                          onClick={() => {
                            // Llama a la función handleDelete para mostrar el modal de confirmación
                            handleDeleteAsset(props.id);
                          }}
                        >
                          Eliminar
                        </button>
                        <button
                          className={`btn btn-danger ${style.left} `}
                          style={{
                            background: "orange",
                            border: "2px solid orange",
                          }}
                          onClick={() => {
                            // Llama a la función handleDelete para mostrar el modal de confirmación
                            handleLogicDelete(props.id);
                          }}
                        >
                          Suspender
                        </button>
                        <button
                          className={`btn btn-danger ${style.left} `}
                          style={{
                            background: "green",
                            border: "2px solid green",
                          }}
                          onClick={() => {
                            // Llama a la función handleDelete para mostrar el modal de confirmación
                            handleDeleteAsset(props.id);
                          }}
                        >
                          Reactivar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={style.buttonContainer}>
          <button onClick={prevHandler} className={style.button}>
            PREV
          </button>
          <p>
            Pagina {currentPage + 1} de {totalProp}
          </p>
          <button onClick={nextHandler} className={style.button}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
