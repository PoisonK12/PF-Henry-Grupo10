
import React, { useState, useEffect } from "react";
import style from "./Landing.module.css";
import landind1 from "../../assets/images/land.avif"
import landing2 from "../../assets/images/Landing.jpeg.webp"
import landing3 from "../../assets/images/landing3.jpg";
import landing4 from "../../assets/images/landing4.webp";
import landing5 from "../../assets/images/landing5.avif";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Landing = () => {
  const navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      setTimeout(() => {
        {<Loader></Loader>}
      }, 3000 )
        navigate("/home"); // Redireccionar después de 3 segundos
    }, 3500);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  return(
    <div>
      <section className={style.select}>
        <div className={style.textOverlay}>
          <h1 className={style.text}>Bienvenidos a </h1>
          <h2  className={style.text2}>Great Travel</h2>
          <hr></hr>
          <p className={style.parra}> Experimenta el encanto de la hospitalidad moderna en nuestros alquileres de primera categoría. Despierta con vistas impresionantes y comodidad lujosa, haciendo que tu estancia sea verdaderamente inolvidable.</p>
        </div>
        <img className={style.ima} name='S02' src={landing2} alt="" />
        <img name='S04' src={landing4} alt="" />
        <img name='S01' src={landind1} alt="" />
        <img className={style.ima} name='S05' src={landing5} alt="" />
        <img className={style.ima} name='S03' src={landing3} alt="" />
      </section>
    </div>
  
  )

}
export default Landing;