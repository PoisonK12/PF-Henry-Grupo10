// import React, { useState, useEffect } from "react";
// import { Carousel } from "react-bootstrap";
// import style from "./Landing.module.css";
// import image1 from "../../assets/images/slider-slide-1.jpg";
// import image2 from "../../assets/images/slider-slide-2.jpg";
// import image3 from "../../assets/images/slider-slide-3.jpg";

// const Landing = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animationActive, setAnimationActive] = useState(false);

//   useEffect(() => {
//     const redirectTimeout = setTimeout(() => {
//       window.location.href = "/home"; // Redireccionar después de 3 segundos
//     }, 5000);

//     return () => {
//       clearTimeout(redirectTimeout);
//     };
//   }, []);

//   const handleSelect = (selectedIndex, e) => {
//     setActiveIndex(selectedIndex);
//     setAnimationActive(true);
//     setTimeout(() => {
//       setAnimationActive(false);
//     }, 300);
//   };

//   const slides = [
//     {
//       bgImage: image1,
//       subtitle: "Welcome to",
//       title: "Your Modern Getaway",
//       content: "Experience the allure of modern hospitality at our premier rentals. Wake up to stunning views and luxurious comfort, making your stay truly unforgettable.",
//     },
//     {
//       bgImage: image2,
//       subtitle: "Discover our",
//       title: "Breathtaking Views",
//       content: "Every room offers more than just a place to rest – it provides an unparalleled view that captivates the senses. Indulge in the beauty of our surroundings while enjoying all the comforts of home.",
//     },
//     {
//       bgImage: image3,
//       subtitle: "Experience the",
//       title: "Local Flavors",
//       content: "Delight your taste buds at our onsite restaurant, where culinary excellence meets local flavors. Immerse yourself in a dining experience that brings the essence of the region to your plate.",
//     },
//   ];

//   return (
//     <div className={style.landing}>
//       <Carousel interval={2000} activeIndex={activeIndex} onSelect={handleSelect}>
//         {slides.map((slide, index) => (
//           <Carousel.Item key={index}>
//             <div className={`${style.imageContainer}`}>
//               <img className="d-block w-100" src={slide.bgImage} alt={`Slide ${index + 1}`} />
//               <div className={`${style.centeredCaption}`}>
//                 <h6
//                   className={`${style.heading} ${style.subtitle} ${animationActive ? style.animate : ""}`}
//                   data-caption-animate="fadeInUpSmall"
//                   data-caption-delay="0"
//                 >
//                   {slide.subtitle}
//                 </h6>
//                 <h1
//                   className={`${style.heading} ${animationActive ? style.animate : ""}`}
//                   data-caption-animate="fadeInUpSmall"
//                   data-caption-delay="100"
//                 >
//                   {slide.title}
//                 </h1>
//                 <p
//                   className={`${style.heading} ${animationActive ? style.animate : ""}`}
//                   data-caption-animate="fadeInUpSmall"
//                   data-caption-delay="200"
//                 >
//                   {slide.content}
//                 </p>
//               </div>
//             </div>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default Landing;

import React, { useState, useEffect } from "react";
import style from "./Landing.module.css";
import landind1 from "../../assets/images/land.avif"
import landing2 from "../../assets/images/Landing.jpeg.webp"
import landing3 from "../../assets/images/landing3.jpg";
import landing4 from "../../assets/images/landing4.webp";
import landing5 from "../../assets/images/landing5.avif";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Landing = () => {
  const navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/home"); // Redireccionar después de 3 segundos
    }, 2000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  return(
    // <div>
    //   <section className={style.select}>
    //     <div className={style.textOverlay}>
    //       <h1 className={style.text}>Welcome to</h1>
    //       <p className={style.parra}> Experience the allure of modern hospitality at our premier rentals. Wake up to stunning views and luxurious comfort, making your stay truly unforgettable.</p>
    //     </div>
    //     <img className={style.ima} name='S02' src={landing2} alt="" />
    //     <img name='S04' src={landing4} alt="" />
    //     <img name='S01' src={landind1} alt="" />
    //     <img className={style.ima} name='S05' src={landing5} alt="" />
    //     <img className={style.ima} name='S03' src={landing3} alt="" />
    //   </section>
    // </div>
    <>
      <Loader></Loader>
    </>
  )

}
export default Landing;