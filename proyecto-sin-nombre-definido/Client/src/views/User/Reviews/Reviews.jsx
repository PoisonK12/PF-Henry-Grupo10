import { Link } from "react-router-dom";
import style from "./reviews.module.css";
import test from "./test";
import React, { useEffect, useState } from "react";
import { reviewsGet, reviewsPut } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Reviews = () => {
  // const testeo = test;
  const testeo = useSelector((state) => state.myReviews);
  console.log(testeo);
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);

  const handleChange = (e, id) => {
    const { value, name, type } = e.target;
    const updatedReview = reviews.map((e) => {
      if (e.id == id) {
        return {
          ...e,
          [name]: type == "radio" ? Number(value) : value,
        };
      }
      return e;
    });
    setReviews(updatedReview);
  };
  console.log(reviews);
  const handleSubmit = (id, condicional, e) => {
    e.preventDefault();
    setReviews({ ...reviews, id: id });
    const reviewToupdate = reviews.find((review) => review.id == id);
    dispatch(reviewsPut(reviewToupdate, condicional));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    dispatch(reviewsGet(data.userName));
    const initialReviews = testeo.map((ele) => ({
      Pk: ele.id,
      comment: "",
      score: 0,
      userName: data.userName,
      id: ele.id,
    }));
    setReviews(initialReviews);
  }, []);

  // console.log("aaaaaaaaaaaaaaaaaaapaaaa", testeo);
  return (
    <div style={{marginTop:"50px"}}>
      <div>
        {/* <h1>Soy el componete reviews{testeo[0].name}</h1> */}
        <div className={style.div}>
          {Array.isArray(testeo) ? (
            testeo?.map((props) => (
              <form onSubmit={(e) => handleSubmit(props.id, props.profilePic ? "users" : "assets", e)}>
                <div className={`${style.centeredContent}`} key={props.id}>
                  <div className={`card mb-3 p-2 ${style.maxWidth}`}>
                    <div className="row g-0">
                      <div className={style.image}>
                        <img
                          src={
                            props?.images ? props?.images[0] : props?.profilePic
                          }
                          style={{
                            width: "300px",
                            height: "300px",
                            objectFit: "cover",
                            backgroundPosition: "center bottom",
                          }}
                        ></img>
                        <h3>{props?.name ? props?.name : props?.fullName}</h3>
                      </div>
                      <div>
                        <textarea
                          type="text"
                          onChange={(e) => handleChange(e, props.id)}
                          value={
                            reviews.find((review) => review.id === props.id)
                              ?.comment || ""
                          }
                          name="comment"
                          cols={30}
                          rows={6}
                          style={{resize:"none"}}
                          placeholder="comentario"
                        />
                        {/* <input name="score" type="number" onChange={handleChange} value={reviews.score}></input> */}

                        <div className={style.rating}>
                          {[5, 4, 3, 2, 1].map((value) => (
                            <React.Fragment key={value}>
                              <input
                                onChange={(e) => handleChange(e, props.id)}
                                value={value}
                                name="score"
                                id={`star${props.id}-${value}`}
                                type="radio"
                                checked={
                                  reviews.find(
                                    (review) => review.id === props.id
                                  )?.score === value
                                }
                              />
                              <label
                                title="text"
                                htmlFor={`star${props.id}-${value}`}
                              >
                                {/* Icono de estrella */}
                                <svg
                                  // key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  // style={{ marginRight: "10px", color: "#9d0aca" }}
                                  fill="currentColor"
                                  class="bi bi-star-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </label>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <button type="submit">Dar reseña!</button>
                    </div>
                  </div>
                </div>
              </form>
            ))
          ) : (
            // Manejo de caso en el que testeo no es un arreglo
            <p>No se encontraron reseñas.</p>
          )}
          {/* {testeo?.map((props, index) => (
            
          ))} */}
        </div>
      </div>
    </div>
  );
};
export default Reviews;
