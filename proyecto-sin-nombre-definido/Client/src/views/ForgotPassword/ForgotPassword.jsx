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
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default ForgotPassword;