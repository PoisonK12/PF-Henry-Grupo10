import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProperties from "../../Card/CardProperties/CardProperties";
import { SearchByLocation, getLocation, searchByFilter } from "../../../redux/actions";
import NotFoundPage from "../../../views/404/404";
import style from "./CardsProperties.module.css"


const CardsProperties = ({setFilter, filter}) => {
  const [currentPage, setCurrentPage] = useState(0);
  
 
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.properties);
  const listContainerRef = useRef(null);
  const {location} = useParams()

 
  
  const totalProp = Math.ceil(allProperties?.count / 10);
  console.log(totalProp);

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
    dispatch(searchByFilter(filter ,currentPage + 1));
  }, [currentPage, dispatch, location]);

  useEffect(() =>{
  }, [allProperties])
  console.log(allProperties)
  return (
    <>
    {allProperties?.rows?.length ? (
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
          rooms={ele.rooms}
          bathrooms={ele.bathrooms}
          coveredArea={ele.coveredArea}
          totalArea={ele.totalArea}
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
    ) : <div><h1 style={{font:"700 70px/1 'Avenir', sans-serif", height:"100%", margin:"0 auto"}}>OH NO!</h1><h4 style={{textAlign:"center"}}>Prueba con otros filtros!</h4></div> }
    </>
  );
};

export default CardsProperties;
