import { useDispatch, useSelector } from 'react-redux';
import style from './favority.module.css'
import { useEffect, useRef, useState } from 'react';
import { deleteFavUserProperty, getAllFavUserProps, getAllReallyProperties } from '../../../redux/actions';
import { Link } from 'react-router-dom';


const Favorites = () => {
    const favoritesData = useSelector((state) => state.myFavoritesProps)
    console.log('favortitos', favoritesData);
    const allProperties = useSelector((state) => state.propertiesCopy);
    console.log('propiedad', allProperties);
    const [props, setProps] = useState({order: "rentPriceAsc"})
    const ref = useRef();
    const dispatch = useDispatch()
    const descripCut = (description) => {
        if (description.length > 220) {
          const newDesc = description
            .split("")
            .slice(0, 220)
            .join("");
          return <p className="card-text">{newDesc}...</p>;
        }
        return <p className="card-text">{description}</p>;
      };
      const matchingFavorites = allProperties?.rows?.filter(property =>
        Array.isArray(favoritesData) && favoritesData.includes(property.id)
      );
    
    const handlerOnclick = (id) => {
        const info = localStorage.getItem("data")
        const userData = JSON.parse(info);
        console.log('idUser',userData.id, 'idAsset', id);
        const idUser = userData.id
        dispatch(deleteFavUserProperty(idUser,id))
        alert("Quitaste esta propiedad de favoritos")
        dispatch(getAllFavUserProps(userData.id))
      }
    // ---Trae las props---
    useEffect(() => {
        ref.current = allProperties;
    });
    const prevFilter = ref.current;

    useEffect(() => {
        if (prevFilter !== allProperties) {
        const fetchData = () => {
            dispatch(getAllReallyProperties(props, 1));
        };
        fetchData();
        }
    }, []);

    useEffect(() => {
        const info = localStorage.getItem("data")
        const userData = JSON.parse(info);
        console.log('idUser',userData);
        dispatch(getAllFavUserProps(userData.id))
    },[])
    return (
        <div>
            <h1>Soy el componete favorites</h1>
            {matchingFavorites?.map((props, index) => (
            <div className={`${style.centeredContent}`} key={props.id}>
            <div className={`card mb-3 p-2 ${style.maxWidth}`}>
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
                          style={{
                            width: "100%",
                            height: "238px",
                            objectFit: "cover",
                            backgroundPosition: "center bottom",
                          }}
                          src={props.images[0]}
                          className="d-block "
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={props.images[1]}
                          style={{
                            width: "100%",
                            height: "238px",
                            objectFit: "cover",
                            backgroundPosition: "center bottom",
                          }}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          style={{
                            width: "100%",
                            height: "238px",
                            objectFit: "cover",
                            backgroundPosition: "center bottom",
                          }}
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
                    <div className={`d-flex justify-content-between m-2 ${style.divButton}`}>
                    <Link to={`/detail/${props.id}`}>
                      <button className="btn btn-primary">
                        Ver Detalles
                      </button>
                    </Link>
                    <div className={`m-2 ${style.icons}`}>
                      <div className={`m-2 ${style.fav}`}>
                        <button style={{backgroundColor :"transparent", border: "none" , width :"25px"}} onClick={() => handlerOnclick(props.id)}>
                          ✖️
                        </button>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
             ))} 
        </div>
    )
}
export default Favorites;