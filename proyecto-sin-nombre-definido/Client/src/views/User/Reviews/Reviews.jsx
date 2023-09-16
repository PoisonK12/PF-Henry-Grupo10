import { Link } from "react-router-dom";
import style from "./reviews.module.css";
import test from "./test";
import { useEffect, useState } from "react";
import { reviewsPut } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const Reviews = () => {
  const testeo = test;
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState({
    id: "",
    userName: "",
    comment: "",
    score: 0,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setReviews({ ...reviews, [name]: value });
  };

  const handleSubmit = (id, condicional) => {
    setReviews({ ...reviews, id: id });
    dispatch(reviewsPut(reviews, condicional));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setReviews({ ...reviews, userName: data.userName });
  },[]);

  console.log("aaaaaaaaaaaaaaaaaaapaaaa", testeo);
  return (
    <div>
      <div>
        <h1>Soy el componete reviews{testeo[0].name}</h1>
        <div>
          {testeo?.map((props, index) => (
            <form onSubmit={() => handleSubmit(props.id, "assets")}>
              <div className={`${style.centeredContent}`} key={props.id}>
                <div className={`card mb-3 p-2 ${style.maxWidth}`}>
                  <div className="row g-0">
                    <div className={style.image}>
                      <img
                        src={props?.images[0]}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "cover",
                          backgroundPosition: "center bottom",
                        }}
                      ></img>
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
                      <input name="score" value={reviews.score}></input>
                      <button type="submit">Button</button>
                    </div>
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
