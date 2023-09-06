import React, { useEffect, useState } from 'react'
import utils from '../Cards/CardsOffer/utils';
import Card from '../Card/CardOffer/CardOffer';
import style from "./Sale.module.css"

const Sale = () => {
    let info = utils;
 

    return (

        <div className={`${style.sale}`}>
            <h2>OFERTAS!</h2>
            <div className={style.cont}>
      <div className={style.cardsCont} >
        
      {
        info.map((prop, index) => <Card key={index} name={prop.name} description={prop.description} address={prop.address} location={prop.location}
        country={prop.country} images={prop.images[0]} onSale={prop.onSale} total={prop.total} perPerson={prop.perPerson} 
        rooms={prop.rooms} bathrooms={prop.bathrooms} offer={prop.offer} coveredArea={prop.coveredArea} totalArea={prop.totalArea}/>)
      }
      </div>
      </div>
      </div>
    );
}

export default Sale