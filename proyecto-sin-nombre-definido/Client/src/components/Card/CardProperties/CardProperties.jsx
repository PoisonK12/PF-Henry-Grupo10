import React from "react";
import style from "./CardProperties.module.css";
import { Link } from "react-router-dom";

const CardProperties = (props) => {
  const descripCut = () => {
    if (props.description.length > 220) {
      const newDesc = props.description.split("").slice(0, 220).join("");
      return <p className="card-text">{newDesc}...</p>;
    }
    return <p className="card-text">{props.description}</p>;
  };

  return (
    <div className={`${style.centeredContent}`} key={props.id}>
      <div className={`card mb-3 ${style.maxWidth}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.images[0]}
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
            <p className={`card-text`}>Precio ${props?.rentPrice}</p>
              <div className="d-flex justify-content-end">
                <Link to={`/detail/${props.id}`}>
                  <button className="btn btn-primary">Ver Detalles</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProperties;
