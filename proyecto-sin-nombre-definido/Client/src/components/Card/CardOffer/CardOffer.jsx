import style from "./card.module.css";

import { useState } from "react";

const Card = ({
  name,
  description,
  address,
  location,
  country,
  images,
  offer,
  onSale,
  total,
  perPerson,
  rooms,
  bathrooms,
  coveredArea,
  totalArea,
}) => {
    const [isOffer, setIsOffer] = useState(offer);
  return (

      <div className={`container`}>
        <div className="row">
          <div className={`col m-4` }>
            <div className={`card ${style.card} rounded`}>

              {isOffer ? <div
                className={ `${style.ribbon} ${style.ribbonTopRight}`}
              >
                <span>oferta</span>
              </div> : ""}
              <div
                className={`bg-image hover-overlay ripple`}
                data-mdb-ripple-color="light"
              >
                <img src={images} className="img-fluid border" />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </div>
              <div className={`card-body ${style.cardContainer}`} >
                <h3 className="card-title font-weight-bold d-flex justify-content-center">
                  <a>{name}</a>
                </h3>
                <p className={`lead ${style.cardLocation}`}>
                  <h4>
                    {location}, {country}
                  </h4>
                </p>
                <p className="card-text">{description}</p>
                

                <hr className="my-4" />
                
                <p className={`mb-2 ${style.price}`}>Precio ${total}</p>
                
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Card;