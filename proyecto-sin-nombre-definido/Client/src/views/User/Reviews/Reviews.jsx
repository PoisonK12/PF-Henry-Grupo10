import { Link } from "react-router-dom";
import style from "./reviews.module.css";
import test from "./test";
import { useEffect, useState } from "react";
import { reviewsGet, reviewsPut } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Reviews = () => {
  // const testeo = test;
  const testeo = useSelector((state) => state.myReviews)
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState({
    Pk:"",
    id: "",
    userName: "",
    comment: "",
    score: 0,
  });

  const handleChange = (e) => {
    const { value, name, type } = e.target;
    if (type === "radio") {
      setReviews({ ...reviews, [name]: Number(value) });
      return;
    }
    setReviews({ ...reviews, [name]: value });
    console.log(reviews)
  };

  const handleSubmit = (id, condicional,e) => {
    e.preventDefault()
    setReviews({ ...reviews, id: id });
    dispatch(reviewsPut(reviews, condicional));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setReviews({ ...reviews, userName: data.userName });
    dispatch(reviewsGet(data.userName))

  }, []);


  // console.log("aaaaaaaaaaaaaaaaaaapaaaa", testeo);
  return (
    <div>
      <div>
        {/* <h1>Soy el componete reviews{testeo[0].name}</h1> */}
        <div>
          {testeo?.map((props, index) => (
            <form onSubmit={(e) => handleSubmit(props.id, "assets",e)}>
              <div className={`${style.centeredContent}`} key={props.id}>
                <div className={`card mb-3 p-2 ${style.maxWidth}`}>
                  <div className="row g-0">
                    <div className={style.image}>
                      {/* <img
                        src={props?.images[0]}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "cover",
                          backgroundPosition: "center bottom",
                        }}
                      ></img> */}
                    </div>
                    <div>
                      <textarea
                        type="text"
                        onChange={handleChange}
                        value={reviews.comment}
                        name="comment"
                        cols={20}
                        placeholder="comentario"
                      />
                      {/* <input name="score" type="number" onChange={handleChange} value={reviews.score}></input> */}

                      <div className={style.rating}>
                        <input
                          onChange={handleChange}
                          value="5"
                          name="score"
                          id="star5"
                          type="radio"
                        />
                        <label title="text" for="star5">
                          {" "}
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
                        <input
                          onChange={handleChange}
                          value="4"
                          name="score"
                          id="star4"
                          type="radio"
                        />
                        <label title="text" for="star4">
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
                        <input
                          onChange={handleChange}
                          value="3"
                          name="score"
                          id="star3"
                          type="radio"
                        />
                        <label title="text" for="star3">
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
                        <input
                          onChange={handleChange}
                          value="2"
                          name="score"
                          id="star2"
                          type="radio"
                        />
                        <label title="text" for="star2">
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
                        <input
                          onChange={handleChange}
                          value="1"
                          name="score"
                          id="star1"
                          type="radio"
                          defaultChecked
                        />
                        <label title="text" for="star1">
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
                      </div>
                    </div>
                    <button type="submit">Dar reseña!</button>
                  </div>
                </div>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Reviews;
