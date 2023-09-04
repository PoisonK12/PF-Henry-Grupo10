import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProperties from "../../Card/CardProperties/CardProperties";
import { SearchByLocation, getLocation } from "../../../redux/actions";
import NotFoundPage from "../../../views/404/404";
import style from "./CardsProperties.module.css"


const CardsProperties = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
 
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.properties);
  const listContainerRef = useRef(null);
  const {location} = useParams()

 
  
  const totalProp = Math.ceil(allProperties?.rows?.length / 10);

  const scrollToTop = () => {
   window.scrollTo({behavior:"smooth", top:0})
  };


  const nextHandler = () => {
    scrollToTop();
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalProp - 1));
  };

  const prevHandler = () => {
    scrollToTop();
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  useEffect(() => {
    dispatch(SearchByLocation(location ,currentPage + 1));
    console.log(allProperties.count);
  }, [currentPage, dispatch, location]);

  useEffect(() =>{
  }, [allProperties])
  console.log(allProperties)
  return (
    <>
    {!allProperties.length ? (
      <>
    <div className={style.background} ref={listContainerRef}> 
      {allProperties.rows?.map((ele) => {
       return <CardProperties
          key={ele.id}
          id={ele.id}
          name={ele.name}
          description={ele.description}
          address={ele.address}
          location={ele.location}
          country={ele.country}
          images={ele.images}
          rentPrice={ele.rentPrice}
        />
      })}
      </div>    
      <div className={style.buttonContainer}>
        <button onClick={prevHandler} className={style.button}>PREV</button>
        <p>Pagina {currentPage + 1} de {totalProp}</p>
        <button onClick={nextHandler} className={style.button}>NEXT</button>
      </div>
      </>
    ) : <NotFoundPage/> }
    </>
  );
};

export default CardsProperties;
