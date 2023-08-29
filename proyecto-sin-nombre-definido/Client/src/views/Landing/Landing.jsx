import React from "react";
import { Carousel } from "react-bootstrap";
import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/slider-slide-1.jpg";
import image2 from "../../assets/images/slider-slide-2.jpg";
import image3 from "../../assets/images/slider-slide-3.jpg";

const Landing = () => {
  return (
    <div className={style.landing}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption className={style.carouselCaption}>
            <h3>Imagen 1</h3>
            <p>Descripción de la imagen 1.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"
          />
          <Carousel.Caption className={style.carouselCaption}>
            <h3>Imagen 2</h3>
            <p>Descripción de la imagen 2.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image3}
            alt="Third slide"
          />
          <Carousel.Caption className={style.carouselCaption}>
            <h3>Imagen 3</h3>
            <p>Descripción de la imagen 3.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Landing;
