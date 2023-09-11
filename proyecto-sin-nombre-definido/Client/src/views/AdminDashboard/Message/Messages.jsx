import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteMessageById, getAllContact } from "../../../redux/actions";
import style from "./message.module.css"

const Message = () => {
    const contact = useSelector(state => state.contact)
    const [selectedContactEmail, setSelectedContactEmail] = useState(""); 
    const [messageText, setMessageText] = useState("");
    console.log('regiustros', contact);
    const handleSendMessage = () => {
        // Define los datos para enviar al servidor
        const data = {
          to: selectedContactEmail,
          subject: "Respuesta solicitud",
          text: messageText, // Reemplaza esto con el contenido del mensaje
        };
    
        // Realiza una solicitud POST al servidor para enviar el correo electrónico
        axios
          .post("/sendmail", data) // Debes ajustar la URL de acuerdo a tu configuración de servidor
          .then((response) => {
            console.log(response.data);
            // Agrega lógica adicional según sea necesario
          })
          .catch((error) => {
            console.error("Error al enviar el correo electrónico desde el frontend: ", error);
            // Maneja el error según sea necesario
          });
    };
    
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(deleteMessageById(id))
        dispatch(getAllContact())
    }
    useEffect(() => {
        dispatch(getAllContact())
    },[])
    return(
        <div>
        <div>
        <h1>Soy el componete Mesages</h1>

        <div className={style.cardsCont}>
        {
            contact?.map((ele) =>
            <div className={style.cardCont}>
            <div className={style.cardTittle}>
                <h2>{ele.name}</h2>
            </div>
            <div className={style.cardSeparator}></div>
            <div className={style.cardInfo}>
                <p>{ele.message}</p>
            </div>
            
            
            <div className={style.cardSeparator}></div>
            
            <div>
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={() => setSelectedContactEmail(ele.email)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-exclamation-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z"></path>
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1.5a.5.5 0 0 1-1 0V11a.5.5 0 0 1 1 0Zm0 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path>
                    </svg>
                </button>
            </div>
            <div>
                <button className={style.boton} onClick={() => handleDelete(ele.id)}>
                    X
                </button>
                
            </div>
            </div>
             )
        }
        </div>
        
        </div>
        <div class="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Send message</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Recipient:</label>
                        <input type="text" class="form-control" id="recipient-name" placeholder={selectedContactEmail} disabled/>
                    </div>
                    <div class="mb-3">
                        <label for="message-text" class="col-form-label">Message:</label>
                        <textarea class="form-control" id="message-text" value={messageText} 
          onChange={(e) => setMessageText(e.target.value)} ></textarea>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={()=>handleSendMessage()}>Send message</button>
                </div>
                </div>
            </div>
        </div>
        
    </div>
    )
}
export default Message