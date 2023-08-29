import React from 'react';
import style from './detail.module.css';
import imagen1 from '../../assets/favorite_people1.jpg';
import imagen3 from '../../assets/favorites_people3.jpg'

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
                <h1>Juan Carlos 🔥</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia expedita dolor nisi ducimus suscipit repudiandae quae tenetur non esse quibusdam fugiat accusantium voluptatem, sapiente laudantium doloribus velit aspernatur neque facilis?</p>
            </div>
            <div className={`col-4 border ${style.col}`}>
                <h1>Felipe Camilo 🚀</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia expedita dolor nisi ducimus suscipit repudiandae quae tenetur non esse quibusdam fugiat accusantium voluptatem, sapiente laudantium doloribus velit aspernatur neque facilis?</p>
            </div>
            <div className={`col-4 border ${style.col}`}>
                <h1>Jorge Saenza 🐐</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia expedita dolor nisi ducimus suscipit repudiandae quae tenetur non esse quibusdam fugiat accusantium voluptatem, sapiente laudantium doloribus velit aspernatur neque facilis?</p>
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
