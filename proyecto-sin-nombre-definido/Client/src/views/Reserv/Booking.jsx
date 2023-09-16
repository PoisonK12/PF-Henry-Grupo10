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
      {reserv ? <Reserv setReserv = {setReserv} bookingId = {bookingId} booking ={booking}/> :
      ( <div>
    <h2 className={style.legend}> Disponibilidad </h2>
            
 <form onSubmit={handleSubmit}>
   <div className="d-flex flex-column " style={{marginTop : "40px"}}>
   <fieldset class="border p-1 border-primary rounded" style={{borderColor : "red"}}>
     
 
 <div className="d-flex flex-row m-4 ">
  
     
       <div className="d-flex flex-row " style={{marginRight: "90px"}}>
          <label>Check-in : </label>
         <DatePicker className={style.data} selected={booking.checkInDate} onChange={handleDateChange} locale={es} />
        
       </div>
       <div className="d-flex flex-row ">
           <label className="form-label">Check-out : </label>
           <DatePicker  className="form-input"   selected={booking.checkOutDate} onChange={handleDateChangeOut} />
       </div>
  
      
       <div style={{marginLeft : "200px"}}>
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