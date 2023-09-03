import style from "./property.module.css";

import CardsProperties from "../../components/Cards/CardsProperties/CardsProperties";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLocation, searchByFilter } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Property = () => {
    const { location} = useParams();
    const history = useNavigate()
    console.log(history)
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    location: location,
    rooms: 0,
    bathrooms: 0,
    onSale: false,
    rentPriceMax: 0,
    rentPriceMin: 0,
    sellPriceMax: 0,
    sellPriceMin: 0,
  });
  const [onSale, setOnSale] = useState(false);

  const allLocation = useSelector((state) => state.location);
  const [locations, setLocations] = useState(allLocation.locations);

  useEffect(() => {
    if (allLocation.locations) {
      setLocations(allLocation.locations);
    }
  }, [allLocation.locations, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(filter)
    if (e.target.type === "range") {
      setFilter({ ...filter, [name]: Number(value) });
      console.log(filter);
      return;
    }
    if(name == "location"){
        history(`/property/${value}`);
        window.location.reload()
    }else{

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
    dispatch(getLocation());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchByFilter(filter));
  };

  return (
    <div className={style.container}>
      <div className="row" style={{ paddingTop: "5rem" }}>
        <div className="col-md-3">
          <div
            className={`${style.centeredContent}  ${style.cardWrapper}`}
            style={{ paddingLeft: "40px" }}
          >
            <div className={`card-body `}>
              <div>
                <label>Localidad</label>
                <select name="location" onChange={handleChange}>
                  <option name="location">{location}</option>
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
              <div>
                <label htmlFor="inputName" className="form-label">
                  Precio de renta maximo
                </label>
                <input
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
                <p>${filter.rentPriceMax}</p>
              </div>
              <div>
                <label htmlFor="inputName" className="form-label">
                  Precio de renta minimo
                </label>
                <input
                  type="range"
                  name="rentPriceMin"
                  min={0}
                  max={500}
                  step={20}
                  onInput={(e) => handleChange(e)}
                  value={filter.rentPriceMin}
                  id="inputName"
                  placeholder="Nombre de tu propiedad"
                />
                <p>${filter.rentPriceMin}</p>
              </div>
              <div>
                <label htmlFor="inputName" className="form-label">
                  Baños
                </label>
                <input
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

              <div>
                <label htmlFor="inputName" className="form-label">
                  Habitaciones
                </label>
                <input
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

              <div>
                <h4>Renta</h4>
                <label htmlFor="inputName" className="form-label">
                  No
                </label>
                <input
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

                <label htmlFor="inputName" className="form-label">
                  Si
                </label>
                <input
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
              {onSale ? (
                <>
                  <div>
                    <label htmlFor="inputName" className="form-label">
                      Precio de venta maximo
                    </label>
                    <input
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
                    <p>${filter.sellPriceMax}</p>
                  </div>
                  <div>
                    <label htmlFor="inputName" className="form-label">
                      Precio de renta minimo
                    </label>
                    <input
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
                    <p>${filter.sellPriceMin}</p>
                  </div>
                </>
              ) : (
                ""
              )}
              <button onClick={(e) => handleSubmit(e)}>aca</button>
              {/* <h5 className="card-title">Card title</h5>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
                
            </div>
            <hr />
            <h5 className="card-title">Card title</h5>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
                
            </div>
            <hr />
            <h5 className="card-title">Card title</h5>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
                
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
                
            </div> */}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <CardsProperties></CardsProperties>
        </div>
      </div>
    </div>
  );
};

export default Property;
