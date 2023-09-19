import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import style from "./Menu.module.css";
import { useEffect, useState } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({});
  const location = useLocation();

  useEffect(() => {
    const jsonData = localStorage.getItem("data");
    if (jsonData) {
      const data = JSON.parse(jsonData);
      setUserName({
        ...userName,
        pic: data.profilePic,
        userName: data.userName,
        id:data.id
      });
      // const userName = data.userName;
    }
    return;
  }, []);

  const logOut = (e) => {
    // e.preventDefault()
    localStorage.removeItem("log");
    localStorage.removeItem("data");
    document.body.style.overflow = "auto"

    navigate("/checkIn");
  };

  return (
    <div className={style.nav}>
      <nav class={`navbar navbar-dark`}>
        <div class={`container-fluid `}>
          <button
            className={style.button}
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <img
              src={userName.pic}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              className={style.button}
            />

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className={style.button}
              width="35"
              height="35"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                className={style.button}
              />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg> */}
          </button>
          <div
            className={`offcanvas offcanvas-end  ${style.navBar}`}
            tabindex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div
              class="offcanvas-header"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <img
                src={userName.pic}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
              <h3 style={{ color: "#f0f0f0" }}>{userName.userName}</h3>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={{ position: "absolute", right: "20px", top: "20px" }}
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li class="nav-item" data-bs-dismiss="offcanvas">
                  <Link
                    class="nav-link"
                    aria-current="page"
                    to={`/userPanel/${userName.id}`}
                    style={{
                      display: "flex",
                      // justifyContent: "center",
                      alignItems: "center",
                      height: "80px",
                    }}
                    aria-label="Close"
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                      &nbsp; Perfil
                    </div>
                  </Link>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    onClick={(e) => logOut(e)}
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "80px",
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-box-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>
                      &nbsp; Salir
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
