import React, { useEffect, useState } from "react";
import style from "./detail.module.css";
import imagen1 from "../../assets/images/Modern-Cabin.jpg";
import imagen2 from "../../assets/images/Exteriores/Image1.jpg";
import imagen3 from "../../assets/images/Exteriores/Image2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAssetById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import NotFoundPage from "../404/404";

const Detail = () => {
  const dispatch = useDispatch();
  const assetDetail = useSelector((state) => state.detail);
  const [imageUrl, setImageUrl] = useState(null);
  console.log("Detalle", assetDetail.images);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAssetById(id));
  }, []);

  const handlerImage = (e) => {
    console.log(e);
    setImageUrl(e.target.style["background-image"]);
  };

  const areOrNull = () => {
    if (!assetDetail) {
      <NotFoundPage />;
    }
  };

  return (
    <>
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
                      backgroundImage: `url(${assetDetail.images?.[0]})`,
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
                      backgroundImage: `url(${assetDetail.images?.[1]})`,
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
                    className={style.thumbnailImage}
                    style={{
                      backgroundImage: `url(${assetDetail.images?.[2]})`,
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
                    : `url(${assetDetail.images?.[0]})`,
                }}
              ></main>
            </div>
          </div>
          <div className={`${style.propertyDetails}`}>
            <div className={`col-8 ${style.propertyInfo}`}>
              <h1 className={style.heading}>{assetDetail.name}</h1>
              <p className={style.paragraph}>{assetDetail.description}</p>
              <p className={style.paragraph}>
                <strong>Dirección:</strong> {assetDetail.address},{" "}
                {assetDetail.location}, {assetDetail.country}
              </p>
            </div>
            <div className={`col-4 ${style.propertyAmenities}`}>
              <h1 className={style.heading}>Amenidades</h1>
              <ul className={style.amenitiesList}>
                <li className={style.amenitiesItem}>
                  <span>• Habitaciones:</span> {assetDetail.rooms}
                </li>
                <li className={style.amenitiesItem}>
                  <span>• Baños:</span> {assetDetail.bathrooms}
                </li>
                <li className={style.amenitiesItem}>
                  <span>• Tamaño propiedad:</span> {assetDetail.coveredArea} mt2
                </li>
                <li className={style.amenitiesItem}>
                  <span>• Total Area:</span> {assetDetail.totalArea}
                </li>
                <li className={style.amenitiesItem}>
                  <span>Precio por noche:</span> $ {assetDetail.rentPrice}
                </li>
              </ul>
            </div>
          </div>
          <div className={`${style.propertyDetails}`}>
          <div className={`col-4 ${style.propertyInfo}`}>
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
          
          <table class="table">
            <thead>
                <tr>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miércoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                    <th>Sabado</th>
                    <th>Domingo</th>
                </tr>
            </thead>
            <tbody>
              <tr class="table-active">
               <th scope="row">1</th>
                <td colspan="2" class="table-active">Larry the Bird</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
              </tr>
              <tr>
               <th scope="row">2</th>
                <td colspan="2" class="table-active">Larry the Bird</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2" class="table-active">Larry the Bird</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
              </tr>
              <tr>
               <th scope="row">4</th>
                <td colspan="2" class="table-active">Larry the Bird</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td colspan="2" class="table-active">Larry the Bird</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td colspan="2" class="table-active">Larry the Bird</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
                <td>Day ...</td>
              </tr>
            </tbody>
          </table>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
