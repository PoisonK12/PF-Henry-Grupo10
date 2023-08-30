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
    <div>
        <div className="container">
          <div className="row">
            <div className="col m-4">
              <div className={`card ${style.card} rounded`}>
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


{/* <div className={`card mb-12`}>
          <div className="row g-0">
            <div className="col-md-4 p-3">
              <img src={images} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <div className="d-flex justify-content-end">
                        <span style={{ fontSize: '24px' }}>⭐⭐⭐⭐</span>
                    </div>
                    <h5 className="card-title" style={{ display: "inline", paddingLeft: "5px" }}>
                    {name}
                    </h5>
                    <h6 style={{ display: "inline", marginLeft: "5px" }}>
                    {address}
                    </h6>
                    
                    <p style={{ paddingLeft: "5px" }}>{description}</p>
                    <p style={{ display: "inline", paddingLeft: "5px" }}>{location}</p>
                    <p style={{ display: "inline", marginLeft: "5px" }}>{country}</p>
                    <p style={{ paddingLeft: "5px" }}>
                        <ul class='custom-list'>
                            <li class="d-inline-block">•🛌Rooms {rooms } </li>
                            <li class="d-inline-block">•🛀Bathroom {bathrooms } </li>
                            <li class="d-inline-block">•🏠{coveredArea } </li>
                            <li class="d-inline-block">•🌱{totalArea } </li>
                        </ul>
                    </p>
                    <div className="d-flex justify-content-end">
                    <button className="btn btn-info" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                        Reservar
                    </button>
                    </div>

                </div>
            </div>

          </div>
        </div> */}