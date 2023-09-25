import style from "./ranking.module.css";
import axios from "axios";
import novedad from "../../../assets/images/novedad.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllReallyProperties, getAllUsers } from "../../../redux/actions";

const Ranking = () => {
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.propertiesCopy);
  console.log('props', allProperties);
  const [props, setProps] = useState({order: "rentPriceAsc"})
  const ref = useRef();
  useEffect(() => {
    ref.current = allProperties;
  });
  const prevFilter = ref.current;

  const descripCut = (description) => {
    if (description?.length > 100) {
      const newDesc = description
        .split("")
        .slice(0, 100)
        .join("");
      return <p className="card-text" style={{ padding:"10px"}}>{newDesc}...</p>;
    }
    return <p className="card-text">{description}</p>;
  };

  const nameCut = (name) => {
    if (name?.length > 5) {
      const newDesc = name
        .split("")
        .slice(0, 20)
        .join("");
      return <p className="card-text" style={{fontWeight:"bold", fontSize:"15px", padding:"10px"}}>{newDesc}...</p>;
    }
    return <p  style={{fontWeight:"bold", fontSize:"15px", padding:"10px"}}>{name}</p>;
  };


  useEffect(() => {
    if (prevFilter !== allProperties) {
      const fetchData = () => {
        dispatch(getAllReallyProperties(props, 1));
      };
      fetchData();
    }
  }, []);
  const [filter, setFilter] = useState({ search: "", order: "" });

  const userRef = useRef();
  useEffect(() => {
    userRef.current = users;
  });
  const prevUser = userRef.current;

  const users = useSelector((state) => state.users);
  console.log('users', users);
  useEffect(() => {
    if (prevUser != users) {
      dispatch(getAllUsers(filter));
    }

    // console.log(allUsers)
  }, [filter]);
  const [email, setEmail] = useState("");
  console.log(email);
  const handleSendMessage = () => {

    // Define los datos para enviar al servidor
    const data = {
      to: email,
      subject: "Respuesta solicitud",
      text: 'Hpolasa', // Reemplaza esto con el contenido del mensaje
    };

    // Realiza una solicitud POST al servidor para enviar el correo electrónico
    axios
      .post("https://daily-oven-production.up.railway.app/sendmail", data) // Debes ajustar la URL de acuerdo a tu configuración de servidor
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Error al enviar el correo electrónico desde el frontend: ",
          error
        );
        // Maneja el error según sea necesario
      });
  };

  return (
    <div>
      <div className={style.centrer}>
        <div className={style.separator}></div>
      </div>
      <div className="row">
        <div
          className="col-6"
          style={{
            paddingTop:"25px",
            paddingRight:"15px",
            width: "50%",
            height:"500px"
          }}
        >
          <h1 className={style.titulo2}>Novedades</h1>
          <article className={style.card2}>
            <div className={style.temporaryText}>
            <img
            src={novedad}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
            </div>
            <div className={style.cardContent}>
            <span className={style.cardTitle}>¡Bienvenidos a la nueva era de las experiencias de viaje!</span>
            <span className={style.cardSubtitle}>En Airbnb, estamos emocionados de presentar las últimas novedades que harán que tus aventuras sean aún más emocionantes.</span>
            <p className={style.cardDescription}>Ahora puedes explorar alojamientos únicos en lugares remotos, descubrir experiencias locales auténticas y conectar con anfitriones excepcionales de todo el mundo.</p>
            <p className={style.cardDescription}>Además, hemos mejorado nuestra plataforma para brindarte una reserva más fácil y segura, con opciones de pago flexibles y una atención al cliente excepcional.</p>
            <p className={style.cardDescription}>Ya sea que estés planeando unas vacaciones familiares, una escapada romántica o una aventura solitaria, Airbnb está aquí para hacer realidad tus sueños de viaje.</p>
            <p className={style.cardDescription}>Únete a millones de viajeros que confían en nosotros para crear recuerdos inolvidables. ¡Descubre las últimas novedades y reserva tu próximo viaje con Airbnb hoy mismo!</p>
            <div className="justify-content-center d-flex mt-5">
              <button className="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Suscribete</button>
            </div>
            </div>
            </article>
          
        </div>

        <div
          className="col-6"
          style={{ width: "50%", height:"100%" }}
        >
          <div className="row">
            <div className="col-6" style={{ width: "100%",}}>
                <h1 className={style.titulo3}>Top 3 Propiedades Del Mes</h1>
            <div className={style.container}>
          
                {allProperties?.rows?.slice(0, 3).map((ele, index) => (
                  <div className={style.card} key={ele.id}>
                    <>{nameCut(ele.name)}</>
                    <div
                    id={`carouselExampleIndicators-${index}`}
                    className="carousel slide"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className={`carousel-inner ${style.containerImg}`}>
                      <div className="carousel-item active">
                        <img
                          style={{borderRadius:"15px", width: "200px", height: "150px" }} 
                          src={ele.images[0]}
                        
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={ele.images[1]}
                          style={{borderRadius:"15px", width: "200px", height: "150px" }} 
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          style={{borderRadius:"15px", width: "200px", height: "150px" }} 
                          src={ele.images[2]}
                          
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carouselExampleIndicators-${index}`}
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselExampleIndicators-${index}`}
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                    {/* <img src={ele.images[0]} alt="" style={{borderRadius:"15px", width: "200px", height: "100px" }} /> */}
                    <p className={style.hoverText}>{descripCut(ele.description)}</p>
                    <div className={style.separator}></div>
                    <span className={style.hoverText} style={{fontWeight:"bold", fontSize:"15px", padding:"10px", justifyContent:"center", display:"flex"}}>{ele.country}</span>
                  </div>
                ))}
              
                
            </div>

              
            </div>
          </div>
          <div className="row">
            <div className="col-6" style={{ width: "98%", height :"100%" }}>
                <h1 className={style.titulo}>Top 5 usuarios del mes</h1>
            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Perfil</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Telefono</th>
                  </tr>
                </thead>
                <tbody>
                {
                    users.length > 0 ? users.slice(0, 1).map((ele) => (
                      <tr key={ele.id}>
                        <th scope="row">🥇</th>
                        <td><img src={ele.profilePic} alt="" style={{width:"30px", height:"30px", borderRadius:"100%"}} /></td>
                        <td>{ele.fullName}</td>
                        <td>{ele.email}</td>
                        <td>{ele.phoneNumber}</td>
                      </tr>
                    )) : null
                  }
                  {
                    users.length > 0 ? users.slice(1, 2).map((ele) => (
                      <tr key={ele.id}>
                        <th scope="row">🥈</th>
                        <td><img src={ele.profilePic} alt="" style={{width:"30px", height:"30px", borderRadius:"100%"}}/></td>
                        <td>{ele.fullName}</td>
                        <td>{ele.email}</td>
                        <td>{ele.phoneNumber}</td>
                      </tr>
                    )) : null
                  }
                  {
                    users.length > 0 ? users.slice(2, 3).map((ele) => (
                      <tr key={ele.id}>
                        <th scope="row">🥉</th>
                        <td><img src={ele.profilePic} alt="" style={{width:"30px", height:"30px", borderRadius:"100%"}}/></td>
                        <td>{ele.fullName}</td>
                        <td>{ele.email}</td>
                        <td>{ele.phoneNumber}</td>
                      </tr>
                    )) : null
                  }
                  {
                    users.length > 0 ? users.slice(3, 5).map((ele, index) => (
                      <tr key={ele.id}>
                        <th scope="row" style={{paddingLeft:"15px"}}>{index + 4}</th>
                        <td><img src={ele.profilePic} alt="" style={{width:"30px", height:"30px", borderRadius:"100%"}}/></td>
                        <td>{ele.fullName}</td>
                        <td>{ele.email}</td>
                        <td>{ele.phoneNumber}</td>
                      </tr>
                    )) : null
                  }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <button type="button" class="btn btn-primary">Open modal for @mdo</button> */}
      
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Enviar Novedades</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label" value="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={email} // Asigna el valor del estado email al campo de entrada
                    onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email cuando el campo cambie
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary"  onClick={handleSendMessage}>Send message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ranking;
