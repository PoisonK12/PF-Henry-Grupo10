import style from "./property.module.css";

import CardsProperties from "../../components/Cards/CardsProperties/CardsProperties";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getLocation, searchByFilter } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "rc-slider/assets/index.css";
import Loader from "../../components/Loader/Loader";

const Property = () => {
  const allProp = useSelector((state) => state.properties);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationValue = searchParams.get("location");
  const rentPriceMaxValue = searchParams.get("rentPriceMax");
  const rentPriceMinValue = searchParams.get("rentPriceMin");
  console.log(locationValue);
  // const { location } = useParams();
  const history = useNavigate();
  console.log(history);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    location: locationValue,
    rooms: 0,
    bathrooms: 0,
    onSale: false,
    rentPriceMax: rentPriceMaxValue ? rentPriceMaxValue : 0,
    rentPriceMin: rentPriceMinValue ? rentPriceMinValue : 0,
    sellPriceMax: 0,
    sellPriceMin: 0,
    order: "rentPriceAsc",
    page: 1,
  });
  const [values, setValues] = useState([0, 1000]);
  const [valuesSell, setValuesSell] = useState([0, 1000]);
  const [onSale, setOnSale] = useState(false);
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    const fetchData = () => {
      dispatch(searchByFilter(filter));
      setTimeout(() => {
        setLoader(false)
      },2000)
    }
    fetchData()
  }, []);

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
    if (name == "location") {
      history(`/property?location=${value}`);
      window.location.reload();
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };

  const handleChangeRangeRent = (newValues) => {
    setValues(newValues);
    setFilter({ ...filter, rentPriceMin: values[0], rentPriceMax: values[1] });
  };

  const handleChangeRangeSell = (newValues) => {
    setValuesSell(newValues);
    setFilter({ ...filter, sellPriceMin: valuesSell[0], sellPriceMax: valuesSell[1] });

  };

  const handleCheckbox = (e) => {
    if (e.target.name === "onSale" && e.target.value === "true") {
      setOnSale(true);
    } else if (e.target.name === "onSale" && e.target.value === "false") {
      setOnSale(false);
    }
  };

  useEffect(() => {
    setVisible(true);

    dispatch(getLocation());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchByFilter(filter));
  };

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
                  <option name="location">Cambiar localidad</option>
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
              <div className={style.filterInput}>
                <label
                  htmlFor="inputName"
                  className={`form-label ${style.label}`}
                >
                  Baños
                </label>
                <input
                  className={style.input}
                  type="number"
                  name="bathrooms"
                  min={0}
                  max={5}
                  step={1}
                  onInput={(e) => handleChange(e)}
                  value={filter.bathrooms}
                  id="inputName"
                  placeholder="Nombre de tu propiedad"
                />
              </div>

              <div className={style.filterInput}>
                <label
                  htmlFor="inputName"
                  className={`form-label ${style.label}`}
                >
                  Habitaciones
                </label>
                <input
                  className={style.input}
                  type="number"
                  name="rooms"
                  min={0}
                  max={5}
                  step={1}
                  onInput={(e) => handleChange(e)}
                  value={filter.rooms}
                  id="inputName"
                  placeholder="Nombre de tu propiedad"
                />
              </div>

              <div className={style.filterInput}>
                <h4>Renta</h4>
                <div className={style.checkboxContainer}>
                  <div className={style.yes}>
                    <label
                      htmlFor="inputName"
                      className={`form-label ${style.label}`}
                    >
                      No
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
                      Si
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
                <>
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
                </>
              ) : (
                ""
              )}
              <button onClick={(e) => handleSubmit(e)} className={style.button}>
                Aplicar filtros!
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {loader ?
            <Loader></Loader>
          :
          <CardsProperties
            setFilter={setFilter}
            filter={filter}
          ></CardsProperties>
          
          }
        </div>
      </div>
    </div>
  );
};

export default Property;
