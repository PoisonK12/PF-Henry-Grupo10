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
              
              <h5 className="card-title" style={{display:"flex"}}>
                <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  boxShadow:
                    "0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.2 )",
                  marginRight:"5px"
                }}
              >
                <p
                  style={{
                    // border: "1px #b9b9b9 solid",
                    padding: "5px",
                    paddingInline: "7px",
                    fontWeight: "bold",
                    fontSize: "19px",
                    color:"black",
                    // marginRight: "%",
                  }}
                >
                  {props?.averageScore} {"  "}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  style={{ marginRight: "10px", color: "#9d0aca" }}
                  fill="currentColor"
                  class="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div> {props.name}</h5>
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
                <p className={`card-text`}>
                  Precio ${props.onSale ? props?.sellPrice : props?.rentPrice}
                </p>
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
