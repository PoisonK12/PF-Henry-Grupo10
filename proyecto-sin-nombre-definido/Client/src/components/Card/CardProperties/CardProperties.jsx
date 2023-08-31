import React from 'react'
import style from "./CardProperties.module.css"


const CardProperties = (props) => {
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
                      <p className="card-text">{props.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {props.address}, {props.country}, {props.location}
                        </small>
                      </p>
                      <div className="d-flex justify-content-end">
                            <button className="btn btn-primary">Ver Detalles</button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default CardProperties