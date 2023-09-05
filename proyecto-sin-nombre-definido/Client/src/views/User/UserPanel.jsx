import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllReallyProperties } from "../../redux/actions";
import style from "./user.module.css";
import { Link } from "react-router-dom";

const UserPanel = () => {
    const dispatch = useDispatch();
    const allProperties = useSelector((state) => state.propertiesCopy);
    const descripCut = (description) => {
        if (description.length > 220) {
          const newDesc = description.split("").slice(0, 220).join("");
          return <p className="card-text">{newDesc}...</p>;
        }
        return <p className="card-text">{description}</p>;
      };
    useEffect(() => {
        dispatch(getAllReallyProperties())
    }, [])
  return (
    <div style={{ paddingTop: "5rem", backgroundColor: "red" }}>
      <div className="row" style={{ marginTop: "3rem", width: "100%"}}>
        <div className="col-md-3">

        </div>
        <div className="col-md-9">
        <div>
        {allProperties?.map((props, index) => (
          <div className={`${style.centeredContent}`} key={props.id}>
            <div className={`card mb-3 ${style.maxWidth}`}>
              <div className="row g-0">
                <div className="col-md-4">
                  <div
                    id={`carouselExampleIndicators-${index}`}
                    className="carousel slide"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${index}`}
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className={`carousel-inner ${style.containerImg}`}>
                      <div className="carousel-item active">
                        <img
                        style={{width: "100%" , height : "238px", objectFit: "cover", backgroundPosition:"center bottom"}}
                          src={props.images[0]}
                          className="d-block " 
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={props.images[1]}
                          style={{width: "100%" , height : "238px", objectFit: "cover", backgroundPosition:"center bottom"}}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                        style={{width: "100%" , height : "238px", objectFit: "cover", backgroundPosition:"center bottom"}}
                          src={props.images[2]}
                          className="d-block "
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carouselExampleIndicators-${index}`}
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselExampleIndicators-${index}`}
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>

                    <button
                      className={style.customButton}
                      data-bs-target="#exampleModalToggle4"
                      data-bs-toggle="modal"
                      onClick={() => setIdHouse(props.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        className={`bi bi-pencil-fill ${style.icon}`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    {descripCut(props.description)}
                    <p className="card-text">
                      <small className="text-muted">
                        {props.address}, {props.country}
                      </small>
                    </p>
                    <div className={`  m-2 ${style.divButton}`}>
                      <Link to={`/detail/${props.id}`}>
                        <button className="btn btn-primary">
                          Ver Detalles
                        </button>
                      </Link>
                      <div className={style.left}>
                        <button
                          className={`btn btn-danger ${style.left} `}
                          onClick={() => {
                            // Llama a la función handleDelete para mostrar el modal de confirmación
                            handleDeleteAsset(props.id);
                          }}
                        >
                          Eliminar
                        </button>
                        <button
                          className={`btn btn-primary ${style.left}`}
                          data-bs-target="#exampleModalToggle"
                          data-bs-toggle="modal"
                          onClick={() => setIdHouse(props.id)}
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
            
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
