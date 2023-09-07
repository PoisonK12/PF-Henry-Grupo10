import React, { useEffect, useState } from "react";
import style from "./detail.module.css";
import bed from "../../assets/images/svg/bed.svg";
import bath from "../../assets/images/svg/bath.svg";
import ruler from "../../assets/images/svg/ruler.svg";
import allSize from "../../assets/images/svg/allSize.svg";
import { useDispatch, useSelector } from "react-redux";
import { SearchByLocation, getAssetById } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import NotFoundPage from "../404/404";
import Calendar from "./Calendar";
import Card from "../../components/Card/CardOffer/CardOffer";

const Detail = () => {
  const dispatch = useDispatch();
  const assetDetail = useSelector((state) => state.detail);
  const [imageUrl, setImageUrl] = useState(null);
  const propertiesSug = useSelector((state) => state.properties);
  const sugs = propertiesSug.rows?.filter((el) => el.id !== assetDetail.id);
  console.log("Detalle", assetDetail);


  useEffect(() => {
    dispatch(SearchByLocation(assetDetail.location));
  }, []);
  console.log("Soliii", sugs);

  const handlerImage = (e) => {
    console.log(e);
    setImageUrl(e.target.style["background-image"]);
  };

  const renderDetail =
    assetDetail && assetDetail.name ? (
      <div className={`  ${style.container}`}>
        <div className={style.wrapper}>
          <header></header>

          <div className={style.imageGallery}>
            <aside className={style.thumbnails}>
              <a
                href="#"
                className={`${style.thumbnail}`}
                data-big="http://placekitten.com/420/600"
              >
                <div
                  className={style.thumbnailImage}
                  style={{
                    backgroundImage: `url(${assetDetail.images[0]})`,
                  }}
                  onClick={handlerImage}
                ></div>
              </a>

              <a
                href="#"
                className={style.thumbnail}
                data-big="http://placekitten.com/450/600"
              >
                <div
                  className={style.thumbnailImage}
                  style={{
                    backgroundImage: `url(${assetDetail.images[1]})`,
                  }}
                  onClick={handlerImage}
                ></div>
              </a>
              <a
                href="#"
                className={style.thumbnail}
                data-big="http://placekitten.com/460/700"
              >
                <div
                  className={`${style.thumbnailImage} ${style.lastChild}`}
                  style={{
                    backgroundImage: `url(${assetDetail.images[2]})`,
                  }}
                  onClick={handlerImage}
                ></div>
              </a>
            </aside>

            <main
              className={style.primary}
              style={{
                backgroundImage: imageUrl
                  ? imageUrl
                  : `url(${assetDetail.images[0]})`,
              }}
            ></main>
          </div>
        </div>
        <div className={`${style.propertyDetails}`}>
          <div className={` ${style.propertyInfo}`}>
            <h2 style={{ fontWeight: "bold", color: "#091f44" }}>
              {assetDetail.rentPrice} USD
            </h2>
            <h1 className={style.heading}> {assetDetail.name}</h1>
            <p className={style.paragraph}>
              <strong>Dirección:</strong> {assetDetail.address},{" "}
              {assetDetail.location}, {assetDetail.country}
            </p>
            <div className={style.icons}>
              <div className={style.fav}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </div>
              <div className={style.fav}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-exclamation-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                </svg>
              </div>
            </div>
            <div>
              <ul className={style.amenitiesList}>
                <li className={style.amenitiesItem}>
                  <img src={bed} width="20"></img>
                  <span> Habitaciones:</span> {assetDetail.rooms}
                </li>
                <li className={style.amenitiesItem}>
                  <img src={bath} width={"20"}></img>
                  <span> Baños:</span> {assetDetail.bathrooms}
                </li>
                <li className={style.amenitiesItem}>
                  <img src={ruler} width={"20"}></img>
                  <span> Tamaño propiedad:</span> {assetDetail.coveredArea} mt2
                </li>
                <li className={style.amenitiesItem}>
                  <img src={allSize} width={"20"}></img>
                  <span> Total Area:</span> {assetDetail.totalArea}
                </li>
              </ul>
            </div>
          </div>
          <div className={style.info}>
            <div style={{ display: "flex" }}>
              <div className={style.description}>
                <h2>Descripcion:</h2>
                <p>{assetDetail.description}</p>
              </div>
              <div className={style.googleMap}>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15908.325523601628!2d-74.18270045!3d4.5794067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1693329189613!5m2!1ses-419!2sco"
                  width="100%"
                  height="300"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className={style.reseñas}>
              <h2>Lee las reseñas de los demas huespedes!</h2>
              <div className={style.reseña}>
                <div className={style.contReseña}>
                  <h1>Reseña de Valentina Delucchi</h1>
                  <p>
                    Perderse en la naturaleza nunca había sido tan encantador.
                    La Cabaña Bosque Encantado nos brindó la escapada perfecta
                    del ajetreo y el bullicio de la ciudad. Cada mañana nos
                    despertábamos con el canto de los pájaros y una taza de café
                    en la terraza. El interior de la cabaña estaba decorado con
                    un estilo rústico pero moderno, y nos sentimos como en casa
                    desde el primer momento. Definitivamente, recomiendo esta
                    joya escondida a todos los amantes de la naturaleza.
                  </p>
                </div>
                <div className={style.contReseña}>
                  <h1>Reseña de Mariano Ospina</h1>
                  <p>
                    Perderse en la naturaleza nunca había sido tan encantador.
                    La Cabaña Bosque Encantado nos brindó la escapada perfecta
                    del ajetreo y el bullicio de la ciudad. Cada mañana nos
                    despertábamos con el canto de los pájaros y una taza de café
                    en la terraza. El interior de la cabaña estaba decorado con
                    un estilo rústico pero moderno, y nos sentimos como en casa
                    desde el primer momento. Definitivamente, recomiendo esta
                    joya escondida a todos los amantes de la naturaleza.
                  </p>
                </div>
                <div className={style.contReseña}>
                  <h1>Reseña de Juan Esteban</h1>
                  <p>
                    Realmente un gran hotel ubicado muy cerca de las principales
                    atracciones y ahorra mucho tiempo tratando de encontrar
                    transporte para hacer turismo. El personal del hotel fue
                    amable, el ascensor también funciona completamente y ayudó a
                    los miembro
                  </p>
                </div>
              </div>
            </div>

            {propertiesSug.count == 0 ?<div className={style.sugs}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>
                  Hemos encontrado <span>{propertiesSug.count -1}</span>{" "}
                  coincidencias de localidad
                </h4>
                <Link to={`/property?location=${assetDetail.location}`}>
                  Mira las demas propiedades
                </Link>
              </div>

              <div className={style.card}>
                {sugs?.slice(0, 3).map((el) => {
                  return (
                    <Card
                      name={el.name}
                      description={el.description}
                      location={el.location}
                      country={el.country}
                      images={el.images}
                      total={el.rentPrice}
                    ></Card>
                  );
                })}
              </div>
            </div> :""}
            
            <div className={style.security}>
              <h3 style={{fontSize:"10px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  style={{marginRight: "5px"}}
                  fill="currentColor"
                  class="bi bi-shield-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                  <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                </svg>
                Consejos de seguridad a la hora de alquilar
              </h3>
              <div style={{display: "grid", gridTemplateRows: "repeat(2,1fr)"}}>
                <div style={{display:"flex", width:"100%", alignItems:"center"}}>
                  <h1 style={{marginRight: "10px", color: "#091f44"}}>1</h1><p style={{color:"#091f44"}}>No pagues sin ver la propiedad o tener documentación certificada.</p>
                  <h1 style={{marginRight: "10px", color: "#091f44"}}>2</h1><p style={{color:"#091f44"}}>Evita compartir información bancaria o contraseñas por mensajes.</p>
                </div>
                <div style={{display:"flex", width:"100%", alignItems:"center",}}>
                  <h1 style={{marginRight: "10px", color: "#091f44"}}>3</h1><p style={{color:"#091f44"}}>Precios demasiado bajos pueden ser señal de estafa.</p>
                  <h1 style={{marginRight: "10px", color: "#091f44"}}>4</h1><p style={{color:"#091f44"}}>Si dudas de una oferta, repórtala para prevenir fraudes.</p>
                </div>




              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <NotFoundPage></NotFoundPage>
    );

  return <>{renderDetail}</>;
};

export default Detail;
