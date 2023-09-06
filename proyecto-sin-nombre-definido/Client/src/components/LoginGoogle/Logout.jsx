import { GoogleLogout} from "react-google-login";


const clientId = "547235349182-eqd60168p1n8550uulbpd31vvm35sprd.apps.googleusercontent.com"


function LogOut(){
    const onSuccess = () =>{
console.log("Log Out Successfull");
    }
 

return(
    <div id = "signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}
            
            />
    </div>
)
}
export default LogOut;