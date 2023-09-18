import React , {useState} from "react";
import style from "./Booking.module.css"
import es from 'date-fns/locale/es';
import {  useSelector } from "react-redux"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { setBookingDate } from "../../redux/actions";
import Reserv from "./Reserv";

const Booking = () => {
    const assetDetail = useSelector((state) => state.detail)
    const userData = JSON.parse(localStorage.getItem("data"));
    const [reserv , setReserv] = useState(false);
    const [bookingId , setBookingId] = useState("")
    const [errors , setErrors] = useState("")

    const [booking ,setBooking] = useState({
        assetId : assetDetail.id,
        userId : userData.id,
        checkInDate : "",
        checkOutDate : ""
    });
  
  
   
    const handleDateChange = (date) => {
      setBooking({...booking , checkInDate : date})
    };
  
    const handleDateChangeOut = (date) => {
      setBooking({...booking , checkOutDate : date})
    };
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     await setBookingDate(booking ,setReserv , setBookingId , setErrors)
    };


    return (
    <div >
      {reserv ?
      
       <Reserv setReserv = {setReserv} bookingId = {bookingId} booking ={booking}/> 
       :
      ( 
      <div className={style.infoAvailable}> 
      
    <h2 className={style.legend}> Disponibilidad </h2>
            
 <form onSubmit={handleSubmit}>
   <div className="d-flex flex-column " >
   <fieldset className={style.fieldset}>
     
 
 <div className="d-flex flex-row "style={{backgroundColor : "#ffffff3f" ,padding : "15px", borderRadius : "5px"}} >
  
     
       <div className="d-flex flex-row col-md-5 "  >
          <label className="form-label m-1 lead">Fecha de entrada: </label>
         <DatePicker className={style.data} placeholderText="   yyyy-MM-dd       🗓" selected={booking.checkInDate} onChange={handleDateChange} locale={es} />
        
       </div>
       <div className="d-flex flex-row col-md-5">
           <label className="form-label m-1 lead">Fecha de salida : </label>
           <DatePicker   className={style.data} placeholderText="   yyyy-MM-dd       🗓"  selected={booking.checkOutDate} onChange={handleDateChangeOut} />
       </div>
  
      
       <div  style={{width : "250px" }} >
         <button className={style.button} type="submit" >Ver disponiblidad</button>
       </div>
      
      </div>
   
   </fieldset>
   {errors ? <div className={style.alert}>
      <p>{errors}</p>
   </div> : null}
   </div>
 </form>
     </div>
    )}
      </div>
    )
};

export default Booking