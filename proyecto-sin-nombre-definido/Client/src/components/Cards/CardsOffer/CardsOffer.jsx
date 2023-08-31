import React from "react";
import utils from "./utils";
import Card from "../../Card/CardOffer/CardOffer";
import style from "./cards.module.css"

const Cards = () => {
  let info = utils;
  return (
    <div className={style.cardsCont}>
    {
      info.map((prop) => <Card name={prop.name} description={prop.description} address={prop.address} location={prop.location}
      country={prop.country} images={prop.images[0]} onSale={prop.onSale} total={prop.total} perPerson={prop.perPerson} 
      rooms={prop.rooms} bathrooms={prop.bathrooms} coveredArea={prop.coveredArea} totalArea={prop.totalArea}/>)
    }
    </div>

  );
};

export default Cards;
