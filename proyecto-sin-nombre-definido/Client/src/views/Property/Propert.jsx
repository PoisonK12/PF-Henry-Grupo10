import style from "./property.module.css";

import CardsProperties from "../../components/Cards/CardsProperties/CardsProperties";
import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getLocation, searchByFilter, getAmenities } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "rc-slider/assets/index.css";
import Loader from "../../components/Loader/Loader";

const Property = () => {
  const ref = useRef()

  useEffect(() => {
    ref.current = filter;
  })
  const prevFilter = ref.current;






  const allProp = useSelector((state) => state.properties);
  const allAmenities = useSelector((state) => state.amenities)
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationValue = searchParams.get("location");
  const rentPriceMaxValue = searchParams.get("rentPriceMax");
  const rentPriceMinValue = searchParams.get("rentPriceMin");
  console.log(locationValue);
  // const { location } = useParams();
  const history = useNavigate();
  const [onSale, setOnSale] = useState(false);

  console.log(history);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    location: locationValue,
    rooms: 0,
    bathrooms: 0,
    rentPriceMax: rentPriceMaxValue ? rentPriceMaxValue : 1000,
    rentPriceMin: rentPriceMinValue ? rentPriceMinValue : 0,
    sellPriceMax: 1000,
    sellPriceMin: 0,
    order: "rentPriceAsc",
    page: 1,
    onSale: false,
    amenities: []
  });
  const [values, setValues] = useState([0, 1000]);
  const [valuesSell, setValuesSell] = useState([0, 1000]);
  const [loader, setLoader] = useState(true);
  // useEffect(() => {
  //   const fetchData = () => {
  //     dispatch(searchByFilter(filter));
  //     setTimeout(() => {
  //       setLoader(false);
  //     }, 2000);
  //   };
  //   fetchData();
  // }, [allProp]);

  useEffect(() => {
    if (prevFilter !== filter) {
      const fetchData = () => {
        dispatch(searchByFilter(filter));
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      };
      fetchData();
    }
  }, [filter]);


  const allLocation = useSelector((state) => state.location);
  const [locations, setLocations] = useState(allLocation.locations);

  useEffect(() => {
    if (allLocation.locations) {
      setLocations(allLocation.locations);
    }
  }, [allLocation.locations, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(filter);

    setFilter({ ...filter, [name]: value });
  };

  const handleChangeRangeRent = (newValues) => {
    setValues(newValues);
    setFilter({ ...filter, rentPriceMin: values[0], rentPriceMax: values[1] });
  };

  const handleChangeRangeSell = (newValues) => {
    setValuesSell(newValues);
    setFilter({
      ...filter,
      sellPriceMin: valuesSell[0],
      sellPriceMax: valuesSell[1],
    });
  };

  const handleCheckbox = (e) => {
    console.log("filtradisimo", filter);
    if (e.target.name === "onSale" && e.target.value == "true") {
      setOnSale(true);
    } else if (e.target.name === "onSale" && e.target.value == "false") {
      setOnSale(false);
    }
  };

  useEffect(() => {
    setVisible(true);
    dispatch(getAmenities())
    dispatch(getLocation());
  }, []);

  console.log(allProp);

  return (
    <div className={style.container}>
      <div className="row" style={{ paddingTop: "5rem" }}>
        <div className="col-md-3">
          <div
            className={`${style.centeredContent}  ${style.cardWrapper}`}
            style={{ paddingLeft: "40px" }}
          >
            <div className={`card-body ${style.cardBody} `}>
              <div className={style.filterInput}>
                <label className={`form-label ${style.label}`}>
                  {" "}
                  Localidad
                </label>
                <select
                  name="location"
                  className={style.input}
                  onChange={handleChange}
                >
                  <option name="location" value={locationValue}>Cambiar localidad</option>
                  {locations
                    ? locations.map((ele) => (
                        <option value={ele} key={ele} name="location">
                          {ele}
                        </option>
                      ))
                    : ""}
                  ;
                </select>
              </div>
              <div className={style.filterInput}>
                <label>Tipo de contrato</label>
                <div className={style.checkboxContainer}>
                  <div className={style.yes}>
                    <label
                      htmlFor="inputName"
                      className={`form-label ${style.label}`}
                    >
                      Rentar una propiedad
                    </label>
                    <input
                      className={style.checkbox}
                      type="checkbox"
                      name="onSale"
                      onChange={(e) => {
                        handleChange(e);
                        handleCheckbox(e);
                      }}
                      value={false}
                      checked={onSale === false}
                      id="inputName"
                      placeholder="Nombre de tu propiedad"
                    />
                  </div>
                  <div className={style.no}>
                    <label
                      htmlFor="inputName"
                      className={`form-label ${style.label}`}
                    >
                      Deseo comprar
                    </label>
                    <input
                      className={style.checkbox}
                      type="checkbox"
                      name="onSale"
                      checked={onSale === true}
                      onChange={(e) => {
                        handleChange(e);
                        handleCheckbox(e);
                      }}
                      value={true}
                      id="inputName"
                      placeholder="Nombre de tu propiedad"
                    />
                  </div>
                </div>
              </div>

              {onSale ? (
                <div className={style.filterInput}>
                  <label
                    htmlFor="inputName"
                    className={`form-label ${style.label}`}
                  >
                    Precio de venta
                  </label>
                  <Slider
                    range
                    min={0}
                    step={20}
                    max={1000}
                    value={valuesSell}
                    onChange={handleChangeRangeSell}
                  ></Slider>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>{filter.sellPriceMin}</p>
                    <p>{filter.sellPriceMax}</p>
                  </div>
                </div>
              ) : (
                <div className={style.filterInput}>
                  <label
                    htmlFor="inputName"
                    className={`form-label ${style.label}`}
                  >
                    Precio de renta
                  </label>
                  <Slider
                    range
                    min={0}
                    step={20}
                    max={1000}
                    value={values}
                    onChange={handleChangeRangeRent}
                  ></Slider>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>{filter.rentPriceMin}</p>
                    <p>{filter.rentPriceMax}</p>
                  </div>
                </div>
              )}

              <div
                className={style.filterInput}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <label
                  htmlFor="inputName"
                  style={{ marginTop: "7px", marginRight: "10px" }}
                  className={`form-label ${style.label}`}
                >
                  Habitaciones
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    marginRight: "0",
                    width: "100%",
                  }}
                >
                  <button
                    onClick={() =>
                      setFilter({ ...filter, rooms: filter.rooms - 1 })
                    }
                    className={style.masMenos}
                  >
                    -
                  </button>
                  <span
                    style={{
                      marginInline: "10px",
                      color: "#9d0aca",
                      fontSize: "20px",
                      font: "",
                    }}
                  >
                    {filter.rooms}
                  </span>
                  <button
                    onClick={() =>
                      setFilter({ ...filter, rooms: filter.rooms + 1 })
                    }
                    className={style.masMenos}
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                className={style.filterInput}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <label
                  htmlFor="inputName"
                  style={{ marginTop: "7px", marginRight: "10px" }}
                  className={`form-label ${style.label}`}
                >
                  Baños
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    marginRight: "0",
                    width: "100%",
                  }}
                >
                  <button
                    onClick={() =>
                      setFilter({ ...filter, bathrooms: filter.bathrooms - 1 })
                    }
                    className={style.masMenos}
                  >
                    -
                  </button>
                  <span
                    style={{
                      marginInline: "10px",
                      color: "#9d0aca",
                      fontSize: "20px",
                      font: "",
                    }}
                  >
                    {filter.bathrooms}
                  </span>
                  <button
                    onClick={() =>
                      setFilter({ ...filter, bathrooms: filter.bathrooms + 1 })
                    }
                    className={style.masMenos}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={`${style.filterInput}`}>
                <label  htmlFor="inputName"
                  style={{ marginTop: "7px", marginRight: "10px" }}
                  className={`form-label ${style.label}`}>
                    Amenidades
                  </label>
                  <div style={{display:"flex", flexDirection:"column", }}>
                    {allAmenities?.map((e) =>{
                      console.log(e)
                      return(
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                          <label className="form-label">{e.name}</label>
                          <input type="checkbox" style={{width:"15px"}}></input>
                        </div>
                      )
                    }) }
                  </div>
              </div>

              <button
                onClick={(e) =>
                  setFilter({
                    location: locationValue,
                    rooms: 0,
                    bathrooms: 0,
                    rentPriceMax: rentPriceMaxValue ? rentPriceMaxValue : 1000,
                    rentPriceMin: rentPriceMinValue ? rentPriceMinValue : 0,
                    sellPriceMax: 1000,
                    sellPriceMin: 0,
                    order: "rentPriceAsc",
                    page: 1,
                    onSale: false,
                  })
                }
                className={style.button}
              >
                Resetear filtros!{" "}
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-clockwise"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                    />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                  </svg>
                }
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <select
            onChange={(e) => handleChange(e)}
            name="order"
            className={style.order}
          >
            <option>
              Ordenamiento{" "}
              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-down-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              }
            </option>
            <option name="order" value={"rentPriceAsc"}>
              {"Precio (Menor a mayor)"}
            </option>
            <option name="order" value={"rentPriceDesc"}>
              {"Precio (Mayor a menor)"}
            </option>
            <option name="order" value={"averageScoreAsc"}>
              {"Puntuacion media (Menor a mayor)"}
            </option>
            <option name="order" value={"averageScoreDesc"}>
              {"Puntuacion media (Mayor a menor)"}
            </option>
            <option name="order" value={"numberOfReviewsAsc"}>
              {"Numeros de reviews (Menor a mayor)"}
            </option>
            <option name="order" value={"numberOfReviewsDesc"}>
              {"Numeros de reviews (Mayor a menor)"}
            </option>
          </select>
          {loader ? (
            <Loader></Loader>
          ) : (
            <CardsProperties
              setFilter={setFilter}
              filter={filter}
            ></CardsProperties>
          )}
        </div>
      </div>
    </div>
  );
};

export default Property;
