import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardProperties from "../../Card/CardProperties/CardProperties";
import { getAllProperties } from "../../../redux/actions";


const CardsProperties = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.properties);
  const listContainerRef = useRef(null);

  useEffect(() => {
    dispatch(getAllProperties(currentPage + 1));
    console.log(allProperties.count);
  }, [currentPage, dispatch]);


  
  const totalProp = Math.ceil(allProperties.count / 10);

  const scrollToTop = () => {
   window.scrollTo({behavior:"smooth", top:0})
  };



  const nextHandler = () => {
    setCurrentPage((prevPage) => {
        scrollToTop();
        return Math.min(prevPage + 1, totalProp - 1)});

  };

  const prevHandler = () => {
    setCurrentPage((prevPage) => {
        scrollToTop();
        return Math.max(prevPage - 1, 0)});

  };

  return (
    <>
    <div ref={listContainerRef}> 
      {allProperties.rows?.map((ele) => (
        <CardProperties
          key={ele.id}
          id={ele.id}
          name={ele.name}
          description={ele.description}
          address={ele.address}
          location={ele.location}
          country={ele.country}
          images={ele.images}
        />
      ))}
      </div>    
      <div>
        <button onClick={prevHandler}>PREV</button>
        <button onClick={nextHandler}>NEXT</button>
      </div>
    </>
  );
};

export default CardsProperties;
