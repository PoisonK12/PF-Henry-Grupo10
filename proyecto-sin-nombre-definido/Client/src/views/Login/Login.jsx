import React from "react";

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
     }

     const handleSubmit = async (e) => {
        e.preventDefault();
        await getLogin(login)
     };

    return (
        <>
            <form class= "d-flex flex-row align-items-center justify-content-center text-center">
                <div class="form-group">
                    <label for="InputEmail">Email address</label>
                    <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Escriba su email" onChange={(e) => handleChange(e)}/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="InputPassword">Password</label>
                    <input type="password" class="form-control" id="InputPassword" placeholder="Escriba su contraseña"/>
                </div>
                <button type="submit" class="btn btn-primary"> Entrar </button>
            </form>
        </>
    )
};

export default Login;