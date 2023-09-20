import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteLogicUserById, getAllReallyProperties, getPropertyByUser } from "../../redux/actions";
import style from "./user.module.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Favorites from "./Favorite/Favorites";
import Reviews from "./Reviews/Reviews";
import Widget from "../AdminDashboard/AllProperties/Balance/Balance";
import User from "../AdminDashboard/Profile/Profile";
import AllUsersProps from "./AllUsersProperties/AllUserProps";
import PropertyForm from "../Property Form/PropertyForm";
import { Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";
import EasterEgg from "./EasterEgg";

const UserPanel = () => {
  const [componenteActual, setComponenteActual] = useState("A");
  console.log(componenteActual);
  // const dispatch = useDispatch();
  const [data, setData] = useState({});
  const idUser = data.id
  console.log('Informascasdasd',data);
  const [color, setColor] = useState("#091f44");
  const [selectedLink, setSelectedLink] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLinkClick = (linkName) => {
    setComponenteActual(linkName);
    setSelectedLink(linkName); // Establecer el enlace seleccionado al hacer clic
  };
  const handlePauseUser = async (e, idUser) => {
    console.log('esta el id', idUser);
    e.preventDefault(); // Evita la recarga de la página

    const confirmed = await Swal.fire({
      title: "¿Seguro que deseas suspender tu cuenta?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, suspender",
      cancelButtonText: "Cancelar",
    });
    if (confirmed.isConfirmed) {
      try {
        dispatch(deleteLogicUserById(idUser));
        localStorage.removeItem("log");
        localStorage.removeItem("data");
        navigate('/checkIn')
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al pausar el usuario.",
        });
      }
    }
  }

  useEffect(() => {
    setSelectedLink("A"); // Establecer el enlace seleccionado al hacer clic
    setColor("#091f44"); // Restablecer el color cuando se hace clic en un enlace
  }, []);

  useEffect(() => {
    // if (!data) return
    const info = localStorage.getItem("data");
    setData(JSON.parse(info));
  }, []);

  return (
    <div
    style={{
        paddingTop: "70px",
        backgroundColor: "#DFDFDF",
        padding: "15px",
      }}
      id="profile"
    >
        {/* <EasterEgg></EasterEgg> */}
      <div className="row" style={{ marginTop: "3rem", width: "100%" }}>
        <div className="col-md-3">
          <div
            className={`card ${style.fixedCard}`}
            style={{ position: "sticky", top: "5rem", marginBottom: "1rem" }}
          >
            <div className="card-body mt-2" style={{ padding: "0" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={data?.profilePic}
                  width={150}
                  style={{
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                ></img>
                <h5 className="card-title pt-1">{data?.userName}</h5>
              </div>
              <ul>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    className={style.links}
                    onClick={() => {
                      handleLinkClick("D");
                    }}
                    style={{
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "D" ? color : "white",
                      color: selectedLink === "D" ? "white" : "black",
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
                      &nbsp; Editar perfil
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    className={style.links}
                    onClick={() => handleLinkClick("A")}
                    style={{
                      paddingInline: "5px",

                      backgroundColor: selectedLink === "A" ? color : "white",
                      color: selectedLink === "A" ? "white" : "black",
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
                      &nbsp; Mis propiedades
                    </div>
                  </a>
                </li>
                <Link
                  to={"/addProperty"}
                  style={{ textDecoration: "none", color: "#212529" }}
                >
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      onClick={() => handleLinkClick("E")}
                      className={style.links}
                      style={{
                        paddingInline: "5px",

                        backgroundColor: selectedLink === "E" ? color : "white",
                        color: selectedLink === "E" ? "white" : "black",
                      }}
                      href="#"
                      // onClick={() => setComponenteActual("C")}
                      // onClick={handlerClick}
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
                        &nbsp; Agregar propiedad
                      </div>
                    </a>
                  </li>
                </Link>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => handleLinkClick("B")}
                    style={{
                      color: selectedLink === "B" ? "white" : "black",
                      paddingInline: "5px",

                      backgroundColor: selectedLink === "B" ? color : "white",
                    }}
                    className={style.links}
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
                      &nbsp; Favoritos
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    className={style.links}
                    onClick={() => handleLinkClick("C")}
                    style={{
                      color: selectedLink === "C" ? "white" : "black",

                      paddingInline: "5px",
                      backgroundColor: selectedLink === "C" ? color : "white",
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
                      &nbsp; Mis reseñas
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {componenteActual === "A" ? (
          <div className="col-md-9">
            <AllUsersProps />
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "20px",
                background: "white",
                width: "100%",
                height: "auto",
                borderRadius: "5px",
                paddingBottom:"20px"
              }}
            >
              <h3
                style={{
                  color: "rgb(27, 27, 27)",
                  fontWeight: "bold",
                  fontSize: "32px",
                  marginTop: "10px",
                }}
              >
                Suspender tu cuenta!
              </h3>
              <div
                style={{
                  display: "block",
                  background: "rgba(157, 10, 202, 0.2)",
                  marginInline: "40%",
                  padding: "5px",
                  marginBottom: "10px",
                  borderRadius: "999px",
                }}
              >
                <p style={{ color: "#9d0aca" }}>
                  Avanzar con precaucion{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </p>
              </div>
              <p style={{ width: "55%", margin: "auto", fontSize: "20px" }}>
                Asegúrese de haber realizado una copia de seguridad de su cuenta
                en caso de que alguna vez necesite acceder a sus datos.
                Suspenderemos su cuenta, puede contactarse con nuestro servicio
                si desea volver
              </p>
              <button onClick={(e) => handlePauseUser(e, idUser)}  style={{color:"#9d0aca", textDecoration:"underline", margin:"auto", cursor:"pointer", width:"150px", marginBlock:"10px", border: "none"}}>Suspenda su cuenta!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
