import React, { useEffect, useState } from 'react'
import style from "./ButtonUp.module.css"

const ButtonUp = () => {

    const [showButton , setShowButton ] = useState(false)
    const handleScroll = () =>{ 
        if(window.scrollY > 100){
            setShowButton(true)
        }else{
            setShowButton(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior:"smooth"})
    }

    useEffect(() => {
        window.addEventListener("scroll" , handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


  return (
    <>
    {showButton && (
        <button className={`${style.buttonScrollToTop} ${showButton ? style.visible : ""}` } onClick={scrollToTop}>
            ↑
        </button>
    )}
    </>
  )
}

export default ButtonUp