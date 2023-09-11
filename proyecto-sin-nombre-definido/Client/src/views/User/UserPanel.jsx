import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReallyProperties, getPropertyByUser } from "../../redux/actions";
import style from "./user.module.css";
import { Link, useNavigate } from "react-router-dom";
import Favorites from "./Favorite/Favorites";
import Reviews from "./Reviews/Reviews";
import Widget from "../AdminDashboard/AllProperties/Balance/Balance";
import User from "../AdminDashboard/Profile/Profile";

const UserPanel = () => {
  const [componenteActual, setComponenteActual] = useState("A");
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.myProperties);
  const navigate = useNavigate();


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

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (!data) return 
    const jsonData = JSON.parse(data);
    const id = jsonData.id;
    dispatch(getPropertyByUser(id));
  }, []);

  return (
    <div
      style={{ paddingTop: "5rem", backgroundColor: "gray", padding: "15px" }}
    >
      <div className="row" style={{ marginTop: "3rem", width: "100%" }}>
        <div className="col-md-3">
          <div
            className={`card ${style.fixedCard}`}
            style={{ position: "sticky", top: "5rem", marginBottom: "1rem" }}
          >
            <div className="card-body mt-2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="85"
                  height="85"
                  fill="currentColor"
                  class="bi bi-person-bounding-box"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                </svg>
                <h5 className="card-title pt-1">Name User</h5>
              </div>
              <ul>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => setComponenteActual("D")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "80px",
                    }}
                    href="#"
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-person-fill-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>
                      &nbsp; Edit Profile
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => setComponenteActual("A")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "80px",
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-houses-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z" />
                        <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z" />
                      </svg>
                      &nbsp; All Propertys
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "80px",
                    }}
                    href="#"
                    onClick={() => setComponenteActual("C")}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-house-add-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 1 1-1 0v-1h-1a.5.5 0 1 1 0-1h1v-1a.5.5 0 0 1 1 0Z" />
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                        <path d="m8 3.293 4.712 4.712A4.5 4.5 0 0 0 8.758 15H3.5A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                      </svg>
                      &nbsp; New Property
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => setComponenteActual("B")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "80px",
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-bookmark-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                      </svg>
                      &nbsp; Favorites
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => setComponenteActual("C")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "80px",
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-layout-text-window-reverse"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z" />
                        <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 4v10a1 1 0 0 0 1 1h2V4H1zm4 0v11h9a1 1 0 0 0 1-1V4H5z" />
                      </svg>
                      &nbsp; My Reviews
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {componenteActual === "A" ? (
          <div className="col-md-9">
            <h1>My Properties Created</h1>
            <div>
              <div className={style.widgets}>
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
              </div>
            </div>
            <div>
              {allProperties ? (
                allProperties?.map((props, index) => (
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
                            <div
                              className={`carousel-inner ${style.containerImg}`}
                            >
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

                            <button
                              className={style.customButton}
                              data-bs-target="#exampleModalToggle4"
                              data-bs-toggle="modal"
                              onClick={() => setIdHouse(props.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                fill="currentColor"
                                className={`bi bi-pencil-fill ${style.icon}`}
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                              </svg>
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
                                  className={`btn btn-primary ${style.left}`}
                                  data-bs-target="#exampleModalToggle"
                                  data-bs-toggle="modal"
                                  onClick={() => setIdHouse(props.id)}
                                >
                                  Editar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "auto 0",
                    alignItems: "center",
                  }}
                >
                  <h1>No tienes propiedades registradas</h1>
                  <h2>
                    Registra una propiedad{" "}
                    <span
                      style={{ color: "#9d0aca", cursor: "pointer" }}
                      onClick={() => navigate("/addProperty")}
                    >
                      aqui
                    </span>
                  </h2>
                </div>
              )}
            </div>
            <div
              class="modal fade"
              id="exampleModalToggle4"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
              tabindex="-1"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
                      Editar Perfil
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-6">
                        <div
                          id="drag-drop-area"
                          style={{
                            border: "2px dashed #ccc",
                            textAlign: "center",
                            paddingTop: "93px",
                            cursor: "pointer",
                            marginTop: "10px",
                            marginBottom: "10px",
                            borderRadius: "100%",
                            height: "100%",
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleFile(e.dataTransfer.files[0])}
                        >
                          Arrastra y suelta una imagen aquí o
                          <label
                            htmlFor="fileInput"
                            style={{
                              color: "blue",
                              cursor: "pointer",
                              justifyContent: "center",
                            }}
                          >
                            selecciona un archivo
                          </label>
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFile(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <div className="mb-2">
                          <label
                            htmlFor="nombre"
                            className="form-label"
                            style={{ color: "black" }}
                          >
                            Nombre
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            placeholder="Nombre"
                          />
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="correo"
                            className="form-label"
                            style={{ color: "black" }}
                          >
                            Correo
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="correo"
                            placeholder="Correo electrónico"
                          />
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="contrasena"
                            className="form-label"
                            style={{ color: "black" }}
                          >
                            Contraseña
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="contrasena"
                            placeholder="Contraseña"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer justify-content-center">
                    <button class="btn btn-primary">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : componenteActual === "B" ? (
          <div className="col-md-9">
            <Favorites />
          </div>
        ) : componenteActual === "C" ? (
          <div className="col-md-9">
            <Reviews />
          </div>
        ) : (
          <div className="col-md-9">
            <User />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
