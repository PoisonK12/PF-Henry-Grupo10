import React, { useEffect, useState } from "react";
// import hotel from "../../assets/favorite_people1.jpg";
import forest from "../../assets/images/imagen 2.jpg";
import playa2 from "../../assets/images/image02.jpeg";
import playa3 from "../../assets/images/image0.jpg";
import style from "./Home.module.css";
import ButtonUp from "../../components/ButtonUp/ButtonUp";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import Cards from "../../components/Cards/CardsOffer/CardsOffer";
import Sale from "../../components/Sale/Sale.jsx";
import Contacts from "../Contacts/Contatcs";

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % 3;
      setActiveIndex(nextIndex)
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex])

  
  return (
    <>
      <div className={`${style.containerFluid} ${style.container}`}>
        <div className={style.cajaCarrusel}>
          <section className="indexSection">
            <div>
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className={style.containerText}>
                  <h1 className={style.h2}>
                    Encuentra los mejores
                    <br></br>
                    <span>
                      <span>precios</span>
                      <span>descuentos</span>
                      {/* <span>hoteles!</span> */}
                      <span>servicios</span>
                      <span>destinos</span>
                      <span>precios</span>
                    </span>
                  </h1>
                </div>
                <div className={style.search}>
                  <SearchBar></SearchBar>
                </div>
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className={`carousel-item ${activeIndex == 0 ? "active" : ""}`}>
                    <img
                      className="d-block mx-auto img-fluid "
                      src={forest}
                      alt="..."
                    />
                  </div>
                  <div className={`carousel-item ${activeIndex == 1 ? "active" : ""}`}>
                    <img
                      className="d-block mx-auto img-fluid"
                      src={playa2}
                      alt="..."
                    />
                  </div>
                  <div className={`carousel-item ${activeIndex == 2 ? "active" : ""}`}>
                    <img
                      className="d-block mx-auto img-fluid"
                      src={playa3}
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
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
                  data-bs-target="#carouselExampleIndicators"
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
          </section>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={style.svg}
          viewBox="0 0 1440 320"
        >
          <path
            fill="#e7e7e7"
            fill-opacity="1"
            d="M0,224L48,202.7C96,181,192,139,288,117.3C384,96,480,96,576,117.3C672,139,768,181,864,197.3C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className={style.sale}>
          <Sale></Sale>
        </div>
        <div style={{ height: "100%" }}>
          <Contacts></Contacts>
        </div>
      </div>
    </>
  );
};
