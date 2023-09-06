import React, { useEffect, useState } from "react";
import style from "./adminDashboard.module.css";
import { useDispatch} from "react-redux";

import { getAllReallyProperties} from "../../redux/actions";
import AllUser from "./AllUsers/allUser";
import AllProperties from "./AllProperties/allProperties";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [componenteActual, setComponenteActual] = useState('A');

  useEffect(() => {
    dispatch(getAllReallyProperties());
  }, []);


  return (
    <div className={style.background}>
      
      <div className="row" style={{ marginTop: "3rem", width: "100%"}}>
        <div className="col-md-3">
          <div
              className={`card ${style.fixedCard}`}
              style={{ position: "sticky", top: "5rem", marginBottom: "1rem" }}
            >
              <div className="card-body mt-2">
                
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                </svg>
                <h5 className="card-title pt-1">Name User</h5>
              </div>
              <ul>
                <li class="nav-item">
                      <a
                        class="nav-link"
                        data-bs-target="#exampleModalToggle7"
                        data-bs-toggle="modal"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "80px",
                        }}
                        href="/userPanel"
                      >
                        <div>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
                          <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
                        </svg>
                            &nbsp; Edit Profile
                          
                        </div>
                      </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onClick={() => setComponenteActual('A')}  style={{
                        display: "flex",
                        alignItems: "center",
                        height: "80px",
                      }}>
                      <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-houses-fill" viewBox="0 0 16 16">
                        <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z"/>
                        <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z"/>
                      </svg>
                      &nbsp; All Propertys
                      </div>
                    </a>
                  </li>
                <li class="nav-item">
                    <a class="nav-link" onClick={() => setComponenteActual('B')} href="#"   style={{
                        display: "flex",
                        alignItems: "center",
                        height: "80px",
                      }}>
                      <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                      </svg>
                      &nbsp; All Users
                      </div>
                    </a>
                  </li>
              </ul>

              </div>
          </div>
        </div>
        {componenteActual === "A"?
        <div className="col-md-9">
          <AllProperties/>
        </div>
        :
        <div className="col-md-9">
          <AllUser/>
        </div>
        }
      </div>
  
      <div class="modal fade" id="exampleModalToggle7" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Editar Perfil</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                        marginTop:"10px",
                        marginBottom:"10px",
                        borderRadius: "100%",
                        height: "100%"
                      }}
                      // onDragOver={(e) => e.preventDefault()}
                      // onDrop={(e) => handleFile(e.dataTransfer.files[0])}
                    >
                      Arrastra y suelta una imagen aquí o
                      <label htmlFor="fileInput" style={{ color: "blue", cursor: "pointer", justifyContent: "center" }}>
                        selecciona un archivo
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        // onChange={(e) => handleFile(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div className="mb-2">
                      <label htmlFor="nombre" className="form-label" style={{color: "black"}}>
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
                      <label htmlFor="correo" className="form-label" style={{color: "black"}}>
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
                      <label htmlFor="contrasena" className="form-label" style={{color: "black"}}>
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
  );
};

export default AdminDashboard;
