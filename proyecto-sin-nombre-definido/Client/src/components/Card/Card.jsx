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
      <div className={style.card}>
        <div className={`card mb-12`}>
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
        </div>
      </div>
    </div>
  );
};

export default Card;
