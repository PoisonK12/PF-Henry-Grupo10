import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessageById, getAllContact } from "../../../redux/actions";
import style from "./message.module.css";

const Message = () => {
  const contact = useSelector((state) => state.contact);
  const [selectedContactEmail, setSelectedContactEmail] = useState("");
  const [idContact , setIdContact] = useState("");
  console.log(idContact);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = (id) => {
    console.log('llego aqui el id', id);
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
        dispatch(deleteMessageById(id));
        dispatch(getAllContact());
        // Agrega lógica adicional según sea necesario
      })
      .catch((error) => {
        console.error(
          "Error al enviar el correo electrónico desde el frontend: ",
          error
        );
        // Maneja el error según sea necesario
      });
  };

  const dispatch = useDispatch();
  // const handleDelete = (id) => {
  //   dispatch(deleteMessageById(id));
    // dispatch(getAllContact());
  // };
  useEffect(() => {
    dispatch(getAllContact());
  }, []);
  return (
    <div>
      <div>
        <div className={style.name}>
          <h1 className={style.titulo}>Mensajes</h1>
        </div>

        <div className={style.cardsCont}>
        {contact?.map((ele) => (
        <div className={style.book}>
          
          <div>
            <p className={style.parrafo}>{ele.message}</p>
            
          </div>
          <div>
              <button
                    type="button"
                    class="btn btn-success"
                    style={{
                      position: "absolute", // Posición absoluta para el logo
                      bottom: "0",              // Coloca el logo en la parte superior
                      right: "0",             // Coloca el logo en la parte izquierda
                      zIndex: "-1",
                      margin: "5px"           // Asegura que esté por encima del texto
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                    onClick={() => {setSelectedContactEmail(ele.email), setIdContact(ele.id)}}
                  >
                    
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
                      <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                    </svg>
               
  
              </button>
          </div>
          
          <div className={style.cover}>
            <div className="row-1">
              <div className="col-12 justify-content-center d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-envelope-arrow-down-fill" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697Zm.192 8.159 6.57-4.027L8 9.586l1.239-.757.367.225A4.49 4.49 0 0 0 8 12.5c0 .526.09 1.03.256 1.5H2a2 2 0 0 1-1.808-1.144ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z"/>
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-1.646a.5.5 0 0 1-.722-.016l-1.149-1.25a.5.5 0 1 1 .737-.676l.28.305V11a.5.5 0 0 1 1 0v1.793l.396-.397a.5.5 0 0 1 .708.708l-1.25 1.25Z"/>
                </svg>
              </div>
              <div className="col-12">
                <h1 className={style.text}>{ele.name}</h1>
              </div>

            </div>
          </div>
        </div>
        ))}
          
        </div>
      </div>
      <div
        class="modal fade mt-5"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Send message
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Recipient:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    placeholder={selectedContactEmail}
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Message:
                  </label>
                  <textarea
                    class="form-control"
                    id="message-text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"

              >
                Close
              </button>
              <button
                aria-label="Close"
                data-bs-dismiss="modal"

                type="button"
                class="btn btn-primary"
                onClick={() => handleSendMessage(idContact)}
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
