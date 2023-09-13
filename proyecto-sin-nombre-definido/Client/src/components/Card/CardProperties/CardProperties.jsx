import React from "react";
import style from "./CardProperties.module.css";
import { Link } from "react-router-dom";
import bed from "../../../assets/images/svg/bed.svg";
import bath from "../../../assets/images/svg/bath.svg";
import ruler from "../../../assets/images/svg/ruler.svg";
import allSize from "../../../assets/images/svg/allSize.svg";

const CardProperties = (props) => {
  const descripCut = () => {
    if (props.description.length > 220) {
      const newDesc = props.description
        .split("")
        .slice(0, 220)
        .join("");
      return <p className="card-text">{newDesc}...</p>;
    }
    return <p className="card-text">{props.description}</p>;
  };

  return (
    <div className={`${style.centeredContent}`} key={props.id}>
      <div className={`card mb-4 ${style.maxWidth}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.images[0]}
              style={{
                width: "100%",
                height: "270px",
                objectFit: "cover",
                objectPosition: "center bottom",
              }}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              {descripCut()}
              <p className="card-text">
                <small className="text-muted">
                  {props.address}, {props.country}, {props.location}
                </small>
              </p>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <p className={`card-text`}>Precio ${props?.rentPrice}</p>
                <Link to={`/detail/${props.id}`} target="_blank">
                  <button className="btn btn-primary">Ver Detalles</button>
                </Link>
              </div>
            </div>
            <div className={` ${style.propertyInfo}`}>
              <div>
                <ul className={style.amenitiesList}>
                  <li className={style.amenitiesItem}>
                    <img src={bed} width="20"></img>
                    <span> Habitaciones:</span> {props.rooms}
                  </li>
                  <li className={style.amenitiesItem}>
                    <img src={bath} width={"20"}></img>
                    <span> Baños:</span> {props.bathrooms}
                  </li>
                  <li className={style.amenitiesItem}>
                    <img src={ruler} width={"20"}></img>
                    <span> Tamaño propiedad:</span> {props.coveredArea}mt2
                  </li>
                  <li className={style.amenitiesItem}>
                    <img src={allSize} width={"20"}></img>
                    <span> Total Area:</span> {props.totalArea}mt2
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProperties;
