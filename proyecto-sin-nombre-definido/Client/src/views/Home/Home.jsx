import React, { useEffect, useState } from "react";
import hotel from "../../assets/favorite_people1.jpg";
import playa from "../../assets/images/imagen 2.jpg";
import playa2 from "../../assets/images/image02.jpeg";
import playa3 from "../../assets/images/image0.jpg";
import style from "./Home.module.css";
import ButtonUp from "../../components/ButtonUp/ButtonUp";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import Cards from '../../components/Cards/Cards';

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
                      <span>experiencias!</span>
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
                      src={playa}
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
      <div className={style.card}>
        <div className={`card mb-12`}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={hotel} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className={style.card}>
        <div className={`card mb-12`}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={hotel} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
        </div>
        
      </div>
      <div className={style.card}>
        <div className={`card mb-12`}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={hotel} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
        <ButtonUp/> 
      </div>
    </>
  );
};
