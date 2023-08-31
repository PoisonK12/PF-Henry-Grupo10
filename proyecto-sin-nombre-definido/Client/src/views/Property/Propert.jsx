
import style from "./property.module.css";

import CardsProperties from "../../components/Cards/CardsProperties/CardsProperties";

const Property = () => {
  



  return (
    <div className={style.container}>
      <div className="row" style={{ paddingTop: "5rem" }}>
        <div className="col-md-3">
          <div className={`${style.centeredContent}  ${style.cardWrapper}`} style={{ paddingLeft: "40px"}}>
            <div className={`card-body `}>
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
          
            <CardsProperties></CardsProperties>
          
        </div>
      </div>
    </div>
  );
};

export default Property;
