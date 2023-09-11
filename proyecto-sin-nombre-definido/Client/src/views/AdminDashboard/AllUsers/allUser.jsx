import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserById, getAllUsers } from '../../../redux/actions';
// import { useNavigate } from 'react-router-dom';
import style from "./alluser.module.css"

const AllUser = () => {
  const allUsers = useSelector(state => state.users);
  console.log('usuarios', allUsers);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // Estado para rastrear qué IDs deben deshabilitarse
  const [disabledRows, setDisabledRows] = useState([]);
  
  // Estado para rastrear el fondo de cada fila individualmente
  const [rowBackgrounds, setRowBackgrounds] = useState({});

  const handleDelete = (id) => {
    console.log('ID del usuario a eliminar:', id);
    dispatch(deleteUserById(id));
    // navigate('/home');
    dispatch(getAllUsers());
  }

  const handleDisable = (id) => {
    if (disabledRows.includes(id)) {
      // Si el ID ya está en disabledRows, quitarlo (habilitar)
      setDisabledRows(disabledRows.filter(rowId => rowId !== id));
    } else {
      // Agregar el ID a la lista de IDs deshabilitados
      setDisabledRows([...disabledRows, id]);
    }

    // Cambiar el fondo de la fila seleccionada
    setRowBackgrounds({ ...rowBackgrounds, [id]: disabledRows.includes(id) ? 'white' : '#b2b2b2' });
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <table className="table table-bordered" style={{ borderRadius: '10px' }}>
        <thead style={{ borderRadius: '10px' }}>
          <tr style={{ borderRadius: '10px' }}>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">FullName</th>
            <th scope="col">Adress</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Nationality</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.length && allUsers?.map((ele, index) => (
            <tr key={ele.id} >
              <th scope="row" disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}>{index}</th>
              <td disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}><img src={ele.profilePic} alt="" style={{ width: "35px", height: "35px", borderRadius: "100%" }} /></td>
              <td disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}>{ele.userName}</td>
              <td disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}>{ele.address}</td>
              <td disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}>{ele.email}</td>
              <td disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}>{ele.phoneNumber}</td>
              <td disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}>{ele.nationality}</td>
              <td disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}>{ele.userType}</td>
              <td disabled={disabledRows.includes(ele.id)} style={{ backgroundColor: rowBackgrounds[ele.id] || 'white' }}>
                <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(ele.id)} disabled={disabledRows.includes(ele.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"></path>
                  </svg>
                </button>
                <button type="button" className="btn btn-outline-warning" onClick={() => handleDisable(ele.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"></path>
                  </svg>
                </button>
                <button type="button" className="btn btn-outline-success" disabled={disabledRows.includes(ele.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default AllUser;
