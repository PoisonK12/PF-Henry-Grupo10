import style from "./balance.module.css";

const Widget = ({ type }) => {
  let data;

  const amount = 100;
  const difference = 20;

  switch (type) {
    case "user":
      data = {
        title: "USUARIOS",
        isMoney: false,
        link: "Ver todos los usuarios",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-person-fill ${style.icon}`} viewBox="0 0 16 16" style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)"
              }}>
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            </svg>
          
        )
      };
      break;
    case "order":
      data = {
        title: "ORDENES",
        isMoney: false,
        link: "Ver todas las órdenes",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-cart-check-fill ${style.icon}`}  viewBox="0 0 16 16" style={{
                color: "goldenrod",
                backgroundColor: "rgba(218, 165, 32, 0.2)"
              }}>
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
            </svg>
        )
      };
      break;
    case "earning":
      data = {
        title: "GANANCIAS",
        isMoney: true,
        link: "Ver ganancias",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-coin  ${style.icon}`}  viewBox="0 0 16 16" style={{
                color: "green",
                backgroundColor: "rgba(0, 128, 0, 0.2)"
              }}>
            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            </svg>
        )
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: false,
        link: "Ver detalles",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-bar-chart-fill ${style.icon}`} viewBox="0 0 16 16"  style={{
                color: "purple",
                backgroundColor: "rgba(128, 0, 128, 0.2)"
              }}>
            <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
            </svg>
          
        )
      };
      break;
    default:
      break;
  }

  return (
    <div className={style.widget}>
      <div className={style.left}>
        <span className={style.title}>{data.title}</span>
        <span className={style.counter}>
          {data.isMoney && "$"} {amount}
        </span>
        <span className={style.link}>{data.link}</span>
      </div>
      <div className={style.right}>
        <div className={style.percentagePositive}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eject" viewBox="0 0 16 16">
        <path d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H1.656C.78 9.5.326 8.455.926 7.816L7.27 1.047zM14.346 8.5 8 1.731 1.654 8.5h12.692zM.5 11.5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-1zm14 0h-13v1h13v-1z"/>
        </svg>
          {difference}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
