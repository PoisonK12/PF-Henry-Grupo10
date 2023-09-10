import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./Menu.module.css";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jsonData = localStorage.getItem("data");
  const data = JSON.parse(jsonData);
  const imageProfile = data.profilePic;
  const userName = data.userName;

  const logOut = () => {
    localStorage.removeItem("log");
    if (location.pathname === "/home") {
      return;
    } else {
      navigate("/home");
      return;
    }
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
              src={imageProfile}
              style={{width:"50px",height:"50px",objectFit:"cover", borderRadius: "50%" }}
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
            <div class="offcanvas-header" style={{display:"flex", flexDirection:"column"}}>
              <img src={imageProfile} style={{borderRadius:"50%", objectFit:"cover", marginBottom:"20px"}}/>
              <h3 style={{color:"#f0f0f0"}}>{userName}</h3>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={{position:"absolute", right:"20px", top:"20px"}}
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    aria-current="page"
                    href="/userPanel"
                    style={{
                      display: "flex",
                      // justifyContent: "center",
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
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                      &nbsp; Profile
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
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
                        class="bi bi-clock-history"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                      </svg>
                      &nbsp; Recent
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    onClick={logOut}
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
                      &nbsp; Log out
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
