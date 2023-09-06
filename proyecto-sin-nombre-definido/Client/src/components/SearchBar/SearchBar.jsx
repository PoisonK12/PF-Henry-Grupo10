import React, { useEffect, useState } from "react";
import s from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const allLocation = useSelector((state) => state.location);
 
  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState(allLocation.locations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLocation());
    console.log("Luquinho", allLocation);
  }, [dispatch]);

  useEffect(() => {
    if(allLocation.locations){
      setLocation(allLocation.locations)
    }
  },[allLocation.locations])

 ;


  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 0) {
      const filteredLocation = allLocation.locations.filter((ele) =>
        ele.toLowerCase().includes(value.toLowerCase())
      );

      setLocation(filteredLocation);
    } else {
      setLocation(allLocation.locations)
      
    };

  };
  
  const handleOnClick = (e) => {
    setShowLocation(true);
  };

  const handleSubmit = () => {
    if(search.length === 0){
      return
    }else{

      // dispatch(SearchByLocation(search, 0));
      navigate(`/property?location=${search}`);
    }
  };

  const handleClickSearch = (e) => {
 
    setSearch(e);
    // setShowLocation(false)
  };
  const handleOnClose = () => {
    setTimeout(() => {
      setShowLocation(false);
    }, 220); // Adjust the delay as needed
  };




  return (
    <div className={`${s.major} `}>
      <div className={`${s.form}`}>
        <input
          className={s.input}
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={handleSearch}
          onClick={handleOnClick}
          onBlur={handleOnClose}
        />

        <button className={s.buttons} onClick={handleSubmit}>
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        {/* <button className={s.reset} onClick={cleanButton}></button> */}
        <div className={`${s.results} ${showLocation ? s.show : ""}`}>
          <div className={s.list}>
            {location?.slice(0,5).map((ele) => {
              return (
                <li key={ele} onClick={() => handleClickSearch(ele)}>
                  {ele}
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
