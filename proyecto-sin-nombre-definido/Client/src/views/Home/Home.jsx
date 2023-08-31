import React, { useEffect, useState } from "react";
import hotel from "../../assets/favorite_people1.jpg";
import forest from "../../assets/images/imagen 2.jpg";
import playa2 from "../../assets/images/image02.jpeg";
import playa3 from "../../assets/images/image0.jpg";
import style from "./Home.module.css";
import ButtonUp from "../../components/ButtonUp/ButtonUp";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import Cards from '../../components/Cards/Cards';
import Sale from "../../components/Sale/Sale.jsx";

export const Home = () => {
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
                    <span>
                      <span>precios!</span>
                      <span>descuentos!</span>
                      {/* <span>hoteles!</span> */}
                      <span>servicios!</span>
                      <span>destinos!</span>
                      <span>precios!</span>
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
                  <div className="carousel-item active">
                    <img
                      className="d-block mx-auto img-fluid "
                      src={forest}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block mx-auto img-fluid"
                      src={playa2}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
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

      <Sale></Sale>
        
      </div>
    </>
  );
};
