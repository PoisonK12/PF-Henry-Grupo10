import React from "react";
import style from "./404.module.css";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={`${style.background}`}>
      <div className={` ${style.notFound}`}>
        <div className={style.error}>
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>
          we are sorry, but the page you requested was not found
        </h2>
      <NavLink to="/home">
      <button className={style.button}>HOME</button>
      </NavLink>
      </div>
    </div>

  );
};

export default NotFoundPage;
