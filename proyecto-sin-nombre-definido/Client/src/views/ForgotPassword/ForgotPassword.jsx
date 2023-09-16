import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";


const ForgotPassword = () => {

    const [email, setEmail] = useState();

    const allUsers = useSelector(state => state.users)
    console.log('infoUsers',allUsers);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    axios.defaults.withCredentials = true;
    const handleSubmitBack = (e) => {
      navigate('/checkIn');
    }
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existEmail = allUsers.find((user) => user.email === email)
      if (existEmail) {
        const response = await axios.post('http://localhost:3001/forgot-password', { email });
        if (response.data.Status === "Success") {
            alert("Email enviado, revisa tu bandeja de entrada!")
            navigate('/checkIn');
        }
      }else{
        alert('Email no registrado en la bdd')
        return
      }
    } catch (error) {
        console.error(error);
    }

    useEffect(() => {
      dispatch(getAllUsers())
    },[])
};

    return(
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
      <div className="bg-white p-3 rounded w-30" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 1)' }}>
        <h4>¿Olvidaste tu contraseña?</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{justifyContent: "center", display:"flex"}}>
            <button
              type="submit"
              className="btn btn-success rounded-15"
              style={{ marginRight: "5px"}}
            >
              Enviar
            </button>
            <button
              type="button" // Cambia el tipo de botón a "button"
              className="btn btn-danger rounded-15"
              onClick={(e) => handleSubmitBack(e)} // Redirige al hacer clic
            >
              Cancelar
            </button>
          </div>
          </form>
        
      </div>
    </div>
    )
}

export default ForgotPassword;