import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLogicUserById,
  deleteUserById,
  getAllUsers,
  restoreUserById,
} from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import style from "./alluser.module.css";
import Swal from "sweetalert2";

import axios from "axios";

const AllUser = () => {
  // Obtenemos la lista de usuarios del estado global

  const userRef = useRef();
  useEffect(() => {
    userRef.current = users;
  });
  const prevUser = userRef.current;

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  // Estado para rastrear el filtro de búsqueda
  const [filter, setFilter] = useState({ search: "", order: "" });

  // Manejador para eliminar un usuario
  const handleDelete = (e, id) => {
    e.preventDefault(); // Evita la recarga de la página
    console.log("ID del usuario a eliminar:", id);
    dispatch(deleteUserById(id));
    navigate("/home");
    dispatch(getAllUsers());
  };

  // Manejador para habilitar/deshabilitar una fila

  // Manejador para restaurar un usuario
  const handlerRestoreUser = (e, id) => {
    e.preventDefault(); // Evita la recarga de la página

    Swal.fire({
      title: "¿Seguro que deseas restaurar este usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama a la acción para restaurar el usuario por su ID
        dispatch(restoreUserById(id));
      }
    });
  };

  const handlePauseUser = async (e, id) => {
    e.preventDefault(); // Evita la recarga de la página

    const confirmed = await Swal.fire({
      title: "¿Seguro que deseas pausar este usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, pausar",
      cancelButtonText: "Cancelar",
    });
    if (confirmed.isConfirmed) {
      try {
        dispatch(deleteLogicUserById(id));
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al pausar el usuario.",
        });
      }
    }

   
  };

  useEffect(() => {
    dispatch(getAllUsers(filter));
  }, [filter]);

  // Efecto para cargar la lista de usuarios al montar el componente
  useEffect(() => {
    if (prevUser != users) {
      dispatch(getAllUsers(filter));
    }

    // console.log(allUsers)
  }, [filter]);

  // Filtrar usuarios basados en el filtro de búsqueda
  // const filteredUsers = allUsers?.filter((ele) =>
  //   ele.userName.toUpperCase().includes(filter.toUpperCase())
  // );

  // Manejador para cambios en el input de búsqueda
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div>
      <div className={style.container}>
      <div className="col-md-6 justify-content-center d-flex">
        <select name="order" id="" className={style.order} onChange={(e) => handleInputChange(e)}>
          <option value="">Ordenamiento</option>
          <option name="order" value={"userNameAsc"}>A-Z</option>
          <option name="order" value={"userNameDesc"}>Z-A</option>
          <option value="">A-Z</option>
          <option value="">Z-A</option>

        </select>
      </div>
      <div className="col-md-6 justify-content-center d-flex">
        <input
          type="text"
          id="myInput"
          name="search"
          className={style.myInput}
          onChange={handleInputChange}
          placeholder="🔍   Search for names.."
        />

      </div>
      </div>
      <table className="table table-bordered" style={{ borderRadius: "10px" }}>
        <thead style={{ borderRadius: "10px" }}>
          <tr style={{ borderRadius: "10px" }}>
            <th scope="col">#</th>
            <th scope="col">Avatar</th>
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Nacionalidad</th>
            <th scope="col">Permisos</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users?.map((ele, index) => (
              <tr key={ele.id}>
                <th
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                  scope="row"
                >
                  {index + 1}
                </th>
                <td
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                >
                  <img
                    src={ele.profilePic}
                    alt=""
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "100%",
                    }}
                  />
                </td>
                <td
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                >
                  {ele.userName}
                </td>
                <td
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                >
                  {ele.address}
                </td>
                <td
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                >
                  {ele.email}
                </td>
                <td
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                >
                  {ele.phoneNumber}
                </td>
                <td
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                >
                  {ele.nationality}
                </td>
                <td
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                >
                  {ele.userType}
                </td>
                <td
                  style={{ backgroundColor: ele.hide ? "#edd55e" : "#9bdb92" }}
                >
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => handleDelete(e, ele.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1 .708-.708z"></path>
                    </svg>
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={(e) => handlePauseUser(e, ele.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pause-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"></path>
                    </svg>
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={(e) => handlerRestoreUser(e, ele.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No se encontraron usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
