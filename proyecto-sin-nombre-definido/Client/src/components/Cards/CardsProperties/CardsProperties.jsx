import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CardProperties from '../../Card/CardProperties/CardProperties'
import { getAllProperties } from '../../../redux/actions'

const CardsProperties = () => {
    const dispatch = useDispatch()
  const allProperties = useSelector((state) => state.properties)


  useEffect(() => {
    dispatch(getAllProperties())
    console.log(allProperties)
  },[])



  return (
    <>
        {allProperties.rows.map((ele) =>
            <CardProperties key={ele.id} id={ele.id} name={ele.name} description={ele.description} address={ele.address} location={ele.location} country={ele.country} images={ele.images}/>
        )}
    </>
  )
}

export default CardsProperties