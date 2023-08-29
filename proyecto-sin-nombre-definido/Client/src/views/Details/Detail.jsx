import React from 'react';
import style from './detail.module.css';
import imagen1 from '../../assets/favorite_people1.jpg';
import imagen2 from '../../assets/favorite_people2.jpg';
import imagen3 from '../../assets/favorites_people3.jpg'

const Detail = () => {
  return (
    <div>
      <div className={style.houseDetails}>
        <h2>Casa Ejemplo en Booking</h2>
        <div className={style.imageGallery}>
          <img src={imagen1} alt="Imagen 1" />
          <img src={imagen2} alt="Imagen 2" />
          <img src={imagen3} alt="Imagen 3" />
        </div>
      </div>
    </div>
  );
};

export default Detail;
