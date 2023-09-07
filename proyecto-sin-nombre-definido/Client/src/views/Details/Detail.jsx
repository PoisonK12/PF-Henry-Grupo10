import React, { useEffect, useState } from "react";
import style from "./detail.module.css";
import bed from "../../assets/images/svg/bed.svg";
import bath from "../../assets/images/svg/bath.svg";
import ruler from "../../assets/images/svg/ruler.svg";
import allSize from "../../assets/images/svg/allSize.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAssetById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import NotFoundPage from "../404/404";
import Calendar from "./Calendar";

const Detail = () => {
  const dispatch = useDispatch();
  const assetDetail = useSelector((state) => state.detail);
  const [imageUrl, setImageUrl] = useState(null);
  console.log("Detalle", assetDetail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAssetById(id));
  }, []);

  const handlerImage = (e) => {
    console.log(e);
    setImageUrl(e.target.style["background-image"]);
  };

  const renderDetail =
    assetDetail && assetDetail.name ? (
      <div className={style.container}>
        <div className={`  ${style.container}`}>
          <div className={style.wrapper}>
            <header>
              {/* <h1>Product Image Gallery with Thumbnails</h1>
<p>Click on the thumbnail to view it larger on the right!</p> */}
            </header>

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
              <h2 style={{fontWeight:"bold", color:"#091f44"}}>{assetDetail.rentPrice} USD</h2>
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
                    <span> Tamaño propiedad:</span> {assetDetail.coveredArea}{" "}
                    mt2
                  </li>
                  <li className={style.amenitiesItem}>
                    <img src={allSize} width={"20"}></img>
                    <span> Total Area:</span> {assetDetail.totalArea}
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
          {/* <div className={`${style.propertyDetails}`}> */}
          {/* <div className={`col-4 ${style.propertyInfo}`}>
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
            <div className={`col-8 ${style.propertyAmenities}`}>
              <Calendar />
            </div>
          </div>
          <div className={`${style.reseña}`}>
            <div className={`col-4 ${style.propertyInfo}`}>
              <h1 className={style.headingStyle}>
                Reseña de Playa Serena Oasis
              </h1>
              <p className={style.paragraph}>{assetDetail.reviews}</p>
            </div>
            <div className={`col-4 ${style.propertyInfo}`}>
              <h1 className={style.headingStyle}>
                Reseña de Cabaña Molino Rojo
              </h1>
              <p>
                "Perderse en la naturaleza nunca había sido tan encantador. La
                Cabaña Bosque Encantado nos brindó la escapada perfecta del
                ajetreo y el bullicio de la ciudad. Cada mañana nos
                despertábamos con el canto de los pájaros y una taza de café en
                la terraza. El interior de la cabaña estaba decorado con un
                estilo rústico pero moderno, y nos sentimos como en casa desde
                el primer momento. Definitivamente, recomiendo esta joya
                escondida a todos los amantes de la naturaleza." - Carlos M.
              </p>
            </div>
            <div className={`col-4 ${style.propertyInfo}`}>
              <h1 className={style.headingStyle}>
                Reseña de Loft Urbano Vibrante
              </h1>
              <p>
                "Mi viaje de negocios se convirtió en una experiencia
                emocionante gracias a este loft. Ubicado en el corazón de la
                ciudad, tenía fácil acceso a todas las comodidades y lugares de
                interés. La decoración era elegante y moderna, y me encantó la
                vista panorámica desde el balcón. El anfitrión fue
                extremadamente atento, y la comunicación fue fluida desde el
                momento de la reserva hasta el check-out. Sin duda, volveré a
                reservar este lugar en mi próximo viaje." - Sofia R.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    ) : (
      <NotFoundPage></NotFoundPage>
    );

  return <>{renderDetail}</>;
};

export default Detail;
