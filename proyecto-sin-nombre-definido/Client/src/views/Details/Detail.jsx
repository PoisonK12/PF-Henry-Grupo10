import React from 'react';
import style from './detail.module.css';
import imagen1 from '../../assets/images/single-room-2-1920x1188.jpg';
import imagen3 from '../../assets/images/single-room-1-1920x1409.jpg';

const Detail = () => {
    return (
      <div>
        <div className={`container text-center ${style.container}`}>
          <div className={`row border ${style.row}`}>
            <div className={`col-4 border ${style.col}`}>
              <div className={`row ${style.innerRow}`}>
                <div className={`col-12 ${style.innerCol}`}>
                    <img className={style.image} src={imagen3} alt="Imagen 3" data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                </div>
              </div>
              <div className={`row border ${style.innerRow}`}>
                <div className={`col-12 ${style.innerCol}`}>
                  <img className={style.image} src={imagen3} alt="Imagen 3" />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <img className={style.image} src={imagen1} alt="Imagen 1" />
            </div>
          </div>
          <div className={`row border ${style.row}`}>
            <div className={`col-8 border ${style.col}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem veniam odit labore! Quaerat dicta atque laboriosam sed accusamus unde rerum? Aut dolores voluptas, assumenda beatae velit provident repellat nesciunt quos!</p>
            </div>
            <div className={`col-4 border ${style.col}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem veniam odit labore! Quaerat dicta atque laboriosam sed accusamus unde rerum? Aut dolores voluptas, assumenda beatae velit provident repellat nesciunt quos!</p>
            </div>
          </div>
          <div className={`row border ${style.row}`}>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15908.325523601628!2d-74.18270045!3d4.5794067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1693329189613!5m2!1ses-419!2sco"
              width="400"
              height="300"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={`row border ${style.row}`}>
            <div className={`col-4 border ${style.col}`}>
                <h1 className={style.headingStyle}>Reseña de Playa Serena Oasis</h1>
                <p>"Mi familia y yo tuvimos la mejor experiencia en Playa Serena Oasis. La casa estaba impecable a nuestra llegada, con todas las comodidades que podríamos haber imaginado. La vista al mar desde la terraza era simplemente impresionante, y disfrutamos de inolvidables puestas de sol. Los anfitriones fueron extremadamente amables y estaban disponibles para cualquier pregunta que tuviéramos. Sin duda, este será nuestro destino de vacaciones anual a partir de ahora." - Marta G.</p>
            </div>
            <div className={`col-4 border ${style.col}`}>
                <h1 className={style.headingStyle}>Reseña de Cabaña Molino Rojo</h1>
                <p>"Perderse en la naturaleza nunca había sido tan encantador. La Cabaña Bosque Encantado nos brindó la escapada perfecta del ajetreo y el bullicio de la ciudad. Cada mañana nos despertábamos con el canto de los pájaros y una taza de café en la terraza. El interior de la cabaña estaba decorado con un estilo rústico pero moderno, y nos sentimos como en casa desde el primer momento. Definitivamente, recomiendo esta joya escondida a todos los amantes de la naturaleza." - Carlos M.</p>
            </div>
            <div className={`col-4 border ${style.col}`}>
                <h1 className={style.headingStyle}>Reseña de Loft Urbano Vibrante</h1>
                <p>"Mi viaje de negocios se convirtió en una experiencia emocionante gracias a este loft. Ubicado en el corazón de la ciudad, tenía fácil acceso a todas las comodidades y lugares de interés. La decoración era elegante y moderna, y me encantó la vista panorámica desde el balcón. El anfitrión fue extremadamente atento, y la comunicación fue fluida desde el momento de la reserva hasta el check-out. Sin duda, volveré a reservar este lugar en mi próximo viaje." - Sofia R.</p>
            </div>
          </div>
          
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body">
              <img className={style.image} src={imagen3} alt="Imagen 3" />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };

export default Detail;
