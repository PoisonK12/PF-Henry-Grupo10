import style from "./ranking.module.css";
import novedad from "../../../assets/images/novedad.jpg";

const Ranking = () => {
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
              <button className="btn btn-danger ">Suscribete</button>
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
                <h1 className={style.titulo}>Ranking de Usuarios</h1>
            <div className={style.container}>
                <div className={style.card}>
                    <img src={novedad} alt="" style={{borderRadius: "100%" , width: "100px", height : "100px"}} />
                    <span className={style.hoverText}>Hover me</span>
                    <span className={style.hoverText}>Hover me</span>
                    <span className={style.hoverText}>Hover me</span>
                </div>
                <div className={style.card}>
                    <img src={novedad} alt="" style={{borderRadius: "100%" , width: "150px", height : "150px"}} />
                    <span className={style.hoverText}>Hover me</span>
                    <span className={style.hoverText}>Hover me</span>
                    <span className={style.hoverText}>Hover me</span>
                </div>
                <div className={style.card}>
    
                    <img src={novedad} alt="" style={{borderRadius: "100%" , width: "100px", height : "100px"}} />
                    <span className={style.hoverText}>Hover me</span>
                    <span className={style.hoverText}>Hover me</span>
                    <span className={style.hoverText}>Hover me</span>
                </div>
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
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Correo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">🥇</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">🥈</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">🥉</th>
                    <td>gadss</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{paddingLeft:"15px"}}> 4</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row"  style={{paddingLeft:"15px"}}> 5</th>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ranking;
