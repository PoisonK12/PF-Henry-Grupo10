import { Link } from "react-router-dom";
import  validationReserv from "./validationReserv";
import React , {useEffect, useState} from "react";
import { handleReserv , getPayment } from "../../redux/actions";
import { useSelector } from "react-redux";


const Reserv = ({setReserv , bookingId ,booking}) => {

    const userData = JSON.parse(localStorage.getItem("data"));
    const assetData = useSelector(state => state.detail) 
    const [form  , setForm] = useState({
        name : assetData.name,
        description : assetData.description,
        price : assetData.rentPrice,
        guestName : userData.fullName,
        guestPhoneNumber : userData.phoneNumber,
        checkInDate : booking.checkInDate.toISOString().split("T")[0] ,
        checkOutDate : booking.checkOutDate.toISOString().split("T")[0]
    });

    const [payment ,setPayment] = useState(false)
    const [paymentOpen , setPaymentOpen] = useState("");

    const handleChange = (e) => {
        const {name , value } = e.target

        if(value === "Card") {
            setPayment(true);
            setForm({...form , [name] : value});
        }
        setForm({...form , [name] : value});
    };

    const handleBack = () => {
        setReserv(false)
    };

    useEffect(() => {
        if(paymentOpen.includes("success")) {
            window.close()
        }
    })

    const handlePayment = async (e) => {
        e.preventDefault();
        await getPayment(form  ,setPaymentOpen)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleReserv(bookingId)
    };

//?-------------------Acodarse de decirle a los chicos del back apra arreglar tema rutas success/cancel------------------------------------

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend> Complete los siguientes datos</legend>
            <div className="d-flex flex-row justify-content-start">
               <div className="d-flex flex-column m-4">
                <h6>Es para tí o para alguien más ?</h6>
                <div className="m-2 d-flex flex-column">
                <label>Nombre de inquilino :</label>
                <input type="text"  name="guestName" value={form.guestName} onChange={handleChange} placeholder="Escriba el nombre del inquilino"></input>
                </div>
                <div className="m-2 d-flex flex-column">
                <label>Numero del teléfono</label>
                <input type="text" name="guestPhoneNumber" value={form.guestPhoneNumber} onChange={handleChange} placeholder="Escriba el núm de telefono"></input>
                </div>
                <div>
                    <label>Fecha de ingreso : </label>
                    <input  value={form.checkInDate} disabled></input>
                </div>
                <div>
                    <label>Fecha de salida :</label>
                    <input value={form.checkOutDate} disabled></input>
                </div>
                <div>
                    <span> Elige una forma de pago : </span>
                    <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                        <option value=""> --Selecciona una forma de pago--</option>
                        <option value="Card"> Targeta</option>
                        <option value="Cash"> Efectivo</option>
                    </select>
                </div>
                <div>
                    {payment ?
                    <> 
                    <span>Paga con Stripe</span>
                    <button type="button" onClick={handlePayment}>Stripe</button>
                    </> 
                    : null}
                </div>  
                <div>
                    <input type= "checkbox" name="termCon" value={form.termCon} onChange={handleChange}></input>
                    <span> Acepto los <Link>términos y condiciones</Link></span>
                </div>
                </div>
              
               <div>
                <fieldset className="border p-4"> 
                <span>Precio de la propiedad : </span>
                <p> {assetData.rentPrice}</p> 
                <span> Mas un 15% de IVA </span>
                <p >{( 15 * assetData.rentPrice) / 100}</p>
                <hr></hr>
                <span>Total a pagar : </span>
                <p> {assetData.rentPrice + ( 15 * assetData.rentPrice) / 100 }</p>
                </fieldset>
                </div>
               
            </div>
            <div className="d-flex flex-row justify-content-end ">
            <div >
                <button type="button" onClick={handleBack}>Volver</button>
            </div>
            <div>
                <button type="submit"> Reservar </button>
            </div>
            </div></fieldset>
        </form>
    </div>
    )
};

export default Reserv;