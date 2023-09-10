import React, { useState } from "react";
import Login from "../../components/Login/Login.jsx";
import Register from "../../components/Register/Register";
import style from "./LoginRegister.module.css";
import fondo from "../../assets/images/Exteriores/imageLogin.avif";

const LoginRegister = () => {
  const [conditional, setConditional] = useState("login");
  const [loginSlide, setLoginSlide] = useState(false);

  const handleSwitch = () => {
    setLoginSlide(!loginSlide);
    console.log("Switch")
    if (conditional === "login") {
      setConditional("register");
    } else {
      setConditional("login");
    }
  };

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(45deg, rgba(29,88,148,1) 7%, rgba(186,38,224,1) 100%)",
          border: "none",
          width: "100vw",
          display: "flex",
          padding: "50px",
          paddingInline: "10%",
          paddingBlock: "5%",
          position: "relative",
          margin: "auto",
        }}
      >
        <div
          className={`${style.overlay} ${
            loginSlide ? style.login : style.register
          }`}
        >
          <img
            src={fondo}
            style={{
              objectFit: "cover",
              height: "616px",
              width: "100%",
              display: "block",
              // width: "70%",
              // border: "none",
              // borderRadius:"none",
            }}
            className={style.img}
          ></img>
        </div>
        
        <div
          style={{
            background: "rgba(255, 255, 255, 0.701)",
            width: "100%",
            height:"616px",
            margin: "0 auto",
          }}
        >
          
          <Login handleSwitch={handleSwitch} conditional={conditional} />
          <Register handleSwitch={handleSwitch} conditional={conditional} />
        </div>
        
      </div>
    </>
  );
};

export default LoginRegister;
