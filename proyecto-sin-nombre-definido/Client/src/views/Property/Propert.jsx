import style from "./property.module.css";

import CardsProperties from "../../components/Cards/CardsProperties/CardsProperties";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getLocation, searchByFilter } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Property = () => {
  const allProp = useSelector((state) => state.properties);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationValue = searchParams.get('location')
  const rentPriceMaxValue = searchParams.get('rentPriceMax')
  const rentPriceMinValue = searchParams.get('rentPriceMin')
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
    page: 0
  });
  const [onSale, setOnSale] = useState(false);
  useEffect(() => {
    dispatch(searchByFilter(filter))
  },[])
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
    if (e.target.type === "range") {
      setFilter({ ...filter, [name]: Number(value) });
      console.log(filter);
      return;
    }
    if (name == "location") {
      history(`/property?location=${value}`);
      window.location.reload();
    } else {
      setFilter({ ...filter, [name]: value });
    }
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
                  Precio de renta maximo
                </label>
                <input
                  className={style.range}
                  type="range"
                  name="rentPriceMax"
                  min={0}
                  max={500}
                  step={20}
                  onInput={(e) => handleChange(e)}
                  value={filter.rentPriceMax}
                  id="inputName"
                  placeholder="Nombre de tu propiedad"
                />
                <p style={{marginBottom:"0"}}>${filter.rentPriceMax}</p>
              </div>
              <div className={style.filterInput}>
                <label
                  htmlFor="inputName"
                  className={`form-label ${style.label}`}
                >
                  Precio de renta minimo
                </label>
                <input
                  className={style.range}
                  type="range"
                  name="rentPriceMin"
                  min={0}
                  max={filter.rentPriceMax == 0 ? 300 : filter.rentPriceMax}
                  step={20}
                  onInput={(e) => handleChange(e)}
                  value={filter.rentPriceMin}
                  id="inputName"
                  placeholder="Nombre de tu propiedad"
                />
                <p style={{marginBottom:"0"}}>${filter.rentPriceMin}</p>
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

              <div  className={style.filterInput}>
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

              <div  className={style.filterInput}>
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
                      Precio de venta maximo
                    </label>
                    <input
                      className={style.range}
                      type="range"
                      name="sellPriceMax"
                      min={0}
                      max={500}
                      step={20}
                      onInput={(e) => handleChange(e)}
                      value={filter.sellPriceMax}
                      id="inputName"
                      placeholder="Nombre de tu propiedad"
                    />
                    <p style={{marginBottom:"0"}}>${filter.sellPriceMax}</p>
                  </div>
                  <div className={style.filterInput}>
                    <label
                      htmlFor="inputName"
                      className={`form-label ${style.label}`}
                    >
                      Precio de renta minimo
                    </label>
                    <input
                      className={style.range}
                      type="range"
                      name="sellPriceMin"
                      min={0}
                      max={500}
                      step={20}
                      onInput={(e) => handleChange(e)}
                      value={filter.sellPriceMin}
                      id="inputName"
                      placeholder="Nombre de tu propiedad"
                    />
                    <p style={{marginBottom:"0"}}>${filter.sellPriceMin}</p>
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
          <CardsProperties setFilter={setFilter} filter={filter}></CardsProperties>
        </div>
      </div>
    </div>
  );
};

export default Property;
