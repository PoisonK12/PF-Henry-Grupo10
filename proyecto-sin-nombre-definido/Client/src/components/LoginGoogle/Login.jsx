import { GoogleLogin} from "react-google-login";



const clientId = "547235349182-eqd60168p1n8550uulbpd31vvm35sprd.apps.googleusercontent.com"


function Login(){
    const onSuccess = (res) =>{
console.log("Login Sucess! Current user: ", res.profileObj);
console.log(res.profileObj);
    }
    const onFailure = (res)=>{
        console.log("Login Failed as Fuck! res: ", res);
    }


return(
    <div>
            <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
            //isSignedIn={true}
            />
    </div>
)
}
export default Login;