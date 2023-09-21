import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { id, token } = useParams();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (password.length >= 5) {
          axios.post(`https://daily-oven-production.up.railway.app/reset-password/${id}/${token}`, { password })
            .then(res => {
              if (res.data.Status === "Success") {
                navigate('/checkIn');
              } else {
                // Si la respuesta no es "Success", podrías mostrar un mensaje de error.
                alert('Error al restablecer la contraseña');
              }
            })
            .catch(err => {
              console.log(err);
              alert('Error al realizar la solicitud');
            });
        } else {
          alert('Contraseña muy corta');
        }
      };
      

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100"
        style={{
          background:
            "linear-gradient(45deg, rgba(29,88,148,1) 7%, rgba(186,38,224,1) 100%)",
          border: "none",
          width: "100vw",
          display: "flex",
          padding: "50px",
          paddingInline: "10%",
          paddingBlock: "5%",
          position: "relative",
          margin: "auto",
        }}
        >
            <div className="bg-white p-3 rounded w-25" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 1)' }}>
                <h4>Restablecer Contraseña</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email">
                            <strong>Nueva Contraseña</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-15">
                        Actualizar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
