import style from "./property.module.css";
import utils from "./utils";

const Property = () => {
  let info = utils;

  return (
    <div className={style.container}>
      <div className="row" style={{ paddingTop: "5rem" }}>
        <div className="col-md-3">
          <div className={`${style.centeredContent} ${style.cardWrapper}`} style={{ paddingLeft: "40px"}}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
                
            </div>
            <hr />
            <h5 className="card-title">Card title</h5>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
                
            </div>
            <hr />
            <h5 className="card-title">Card title</h5>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
                
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
                
            </div>

            </div>
            
          </div>
        </div>
        <div className="col-md-9">
          {info.map((props) => (
            <div className={`${style.centeredContent}`} key={props.id}>
              <div className={`card mb-3 ${style.maxWidth}`}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={props.images}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{props.name}</h5>
                      <p className="card-text">{props.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {props.address}, {props.country}, {props.location}
                        </small>
                      </p>
                      <div className="d-flex justify-content-end">
                            <button className="btn btn-primary">Ver Detalles</button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Property;
