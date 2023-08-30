import style from "./card.module.css";
import hotel from "../../assets/favorite_people1.jpg";

const Card = ({
  name,
  description,
  address,
  location,
  country,
  images,
  onSale,
  total,
  perPerson,
  rooms,
  bathrooms,
  coveredArea,
  totalArea,
}) => {
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
                <p className="card-text">{description}</p>
                <ul className="list-unstyled list-inline mb-0">
                  <li className="list-inline-item me-0">
                    <i className="fas fa-star text-primary fa-xs">
                      {" "}
                      • Bathroom 🛀 {bathrooms}
                    </i>
                  </li>
                  <li className="list-inline-item me-0">
                    <i className="fas fa-star text-primary fa-xs">
                      {" "}
                      • Rooms 🛌 {rooms}
                    </i>
                  </li>
                  <li className="list-inline-item me-0">
                    <i className="fas fa-star text-primary fa-xs">
                      {" "}
                      • House Mt2 🏠 {coveredArea}
                    </i>
                  </li>
                  <li className="list-inline-item me-0">
                    <i className="fas fa-star text-primary fa-xs">
                      {" "}
                      • Area 🌱 {totalArea}
                    </i>
                  </li>
                  <li className="list-inline-item">
                    <i className="fas fa-star-half-alt text-primary fa-xs">
                      {" "}
                      • Person 🧑🏽‍💼 {perPerson}
                    </i>
                  </li>
                </ul>

                <hr className="my-4" />
                <p className="lead">
                  <h4>
                    {location}, {country}
                  </h4>
                  <h6>{address}</h6>
                </p>
                <p className="mb-2">Price $ {total}</p>
                <div
                  className="bg-image hover-overlay ripple"
                  data-mdb-ripple-color="light"
                >
                  <img
                    src={images}
                    className="img-fluid border"
                  />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </a>
                </div>
                <div className="card-body">
                  <h3 className="card-title font-weight-bold d-flex justify-content-center">
                    <a>{name}</a>
                  </h3>
                  <p className="card-text">
                   {description}
                  </p>
                  <ul className="list-unstyled list-inline mb-0">
                    <li className="list-inline-item me-0">
                      <i className="fas fa-star text-info fa-xs"> • Bathroom 🛀 {bathrooms}</i>
                    </li>
                    <li className="list-inline-item me-0">
                      <i className="fas fa-star text-info fa-xs"> • Rooms 🛌 {rooms}</i>
                    </li>
                    <li className="list-inline-item me-0">
                      <i className="fas fa-star text-info fa-xs"> • House Mt2 🏠 {coveredArea}</i>
                    </li>
                    <li className="list-inline-item me-0">
                      <i className="fas fa-star text-info fa-xs"> • Area 🌱 {totalArea}</i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fas fa-star-half-alt text-info fa-xs"> • Person 🧑🏽‍💼 {perPerson}</i>
                    </li>
                    
                  </ul>
                  
                  <hr className="my-4" />
                  <p className="lead">
                    <h4>{location}, {country}</h4>
                     <h6>{address}</h6>
                  </p>
                  <p className="mb-2">Price $ {total}</p>
                  <div className={`d-flex justify-content-center ${style.centerButton}`}>
                <button className="btn btn-info">Reservation</button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Card;

