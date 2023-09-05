import style from "./reviews.module.css";

const Reviews = () => {
  return (
    <div>
        <div>
        <h1>Soy el componete reviews</h1>
        <div className={style.cardsCont}>
            <div className={style.cardCont}>
            <div className={style.cardTittle}>
                <h2>Hola</h2>
            </div>
            <div className={style.cardSeparator}></div>
            <div className={style.cardInfo}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, itaque incidunt quam autem id tenetur omnis aspernatur ab reiciendis quos doloribus nisi sequi eum. Velit quas consequatur magni accusantium laboriosam.</p>
            </div>
            </div>
            <div className={style.cardCont}>
            <div className={style.cardTittle}>
                <h2>Hola</h2>
            </div>
            <div className={style.cardSeparator}></div>
            <div className={style.cardInfo}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, itaque incidunt quam autem id tenetur omnis aspernatur ab reiciendis quos doloribus nisi sequi eum. Velit quas consequatur magni accusantium laboriosam.</p>
            </div>
            </div>
            <div className={style.cardCont}>
            <div className={style.cardTittle}>
                <h2>Hola</h2>
            </div>
            <div className={style.cardSeparator}></div>
            <div className={style.cardInfo}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, itaque incidunt quam autem id tenetur omnis aspernatur ab reiciendis quos doloribus nisi sequi eum. Velit quas consequatur magni accusantium laboriosam.</p>
            </div>
            </div>
            
        </div>
        
        </div>
        
    </div>
  );
};
export default Reviews;
