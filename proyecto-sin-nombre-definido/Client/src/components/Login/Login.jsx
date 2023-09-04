import React from "react";
import {getLogin} from "../../redux/actions"

const Login = () => {

    const [login , setLogin ] = useState({
        email : "",
        password : ""
    });

    const handleChange = (e) => {
          const {name} = e.target;
          const {value} = e.target;

          setLogin({
            ...login,
              [name] : value
          });
     };

     console.log(form);
/* 
     const handleSubmit = async (e) => {
        e.preventDefault();
        await getLogin(login)
     }; */

    return (
        <>
        <div class="d-flex align-items-center justify-content-conter">
            <form class= "d-flex align-items-center justify-content-center text-center">
                <fieldset class="border p-3 d-flex flex-column">
                    
                <div class="col-md-2">
                    
                  <div class="form-group">
                    <label for="InputEmail">Email : </label>
                    <input type="email" class="form-control" name="email" id="InputEmail" aria-describedby="emailHelp" value={form.email} placeholder="Escriba su email" onChange={(e) => handleChange(e)}/>
                    <small id="emailHelp" class="form-text text-muted">Nunca mostraremos tu email a nadie!</small>
                  </div>

                  <div class="form-group">
                    <label for="InputPassword">Contraseña :</label>
                    <input type="password" class="form-control" name="password" id="InputPassword" value={form.password} placeholder="Escriba su contraseña"/>
                  </div>
                </div>

                <div class="align-items-center justify-content-center">
                    <button type="submit" class="btn btn-primary"> Entrar </button>
                </div>

                </fieldset>
            </form>
        </div>
        </>
    )
};

export default Login;