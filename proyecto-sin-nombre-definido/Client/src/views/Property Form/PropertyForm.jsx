import React, {useState , useEffect} from "react";
import style from "./PropertyForm.module.css"
import { useNavigate } from "react-router";
import { Carousel , Modal } from "react-bootstrap";
import { createAsset } from "../../redux/actions";
import Card from "../../components/Card/CardOffer/CardOffer";
import validation from "./Validation";


const PropertyForm = () => {


  const [modal , setModal] = useState(false);
  const [modalBody , setModalBody] = useState({response : []})
  const [price , setPrice ] = useState(false);
  const [step , setStep] = useState(1);
  const [errors , setErrors] = useState( {
    
    name  : "",
    location : "",
    country : "",
    address : "",
    bathrooms : "",
    rooms : "",
    images : "",
    totalArea : "",
    coveredArea : "",
    sellPrice : "",
    rentPrice : "",
    description : "",
    errorsBack : []

  })
  const [selectedCkeckbox , setSelectedCheckbox] = useState({
    onSale : "" ,
    parking : "" ,
    terrace : ""
  });
 

console.log(errors);
  const navigate = useNavigate()

  const [form , setForm] = useState({
    name : "",
    images : [],
    country : "",
    address : "",
    location : "",
    onSale : false,
    sellPrice : undefined,
    rentPrice : undefined,
    type : "",
    rooms : undefined,
    bathrooms : undefined,
    description : "",
    parking : false,
    terrace : false,
    coveredArea: undefined,
    totalArea:undefined,
    reviews:"asdasdasd",
    nearby:"asd",
    nearbyScore:1,
    amenities:[1,2,3]
})

  
    console.log(form);
    if(modal && Array.isArray(modalBody.response)) console.log(true);
      


  const handleCheckbox = (e) => {
    if (e.target.name === "onSale" && e.target.value === "true") {
      setPrice(true);
    } else if(e.target.name === "onSale" && e.target.value === "false") {
        setPrice(false);
    }
    setSelectedCheckbox({ ...selectedCkeckbox, [e.target.name]: e.target.value });
  };


  // Función para manejar el evento de soltar la imagen
  const handleDrop = (event) => {
    event.preventDefault();
    if(form.images.length === 3) {
      setErrors({...errors , images : "Solo puedes tres imagenes"})
       setTimeout(() => {
        handle()
      },1000)
      return
    }
   
    const file = event.dataTransfer.files[0];
    handleFile(file)
  
    
  };
  function handle () {
    setErrors({...errors , images : undefined})
  }

  // Función para manejar el archivo seleccionado
  const handleFile = (file) => {
  console.log(file);
    if(!file.type.startsWith("image/")){
      setErrors({...errors, images : "Tiene q ser una imagen"})
      setTimeout(() => {
        handle()
      },1000)
      return

    }
    if(file.type.startsWith('image/')) {
      const imageURL = URL.createObjectURL( new Blob([file]));
      setErrors({...errors , images : undefined})
      setForm({...form , images : [... form.images , imageURL]})
      return
    }
    
  };


  const handleStep = (e) => {
  e.preventDefault()


  if(e.target.value === "prev") {
    setStep(step - 1)
    console.log(step);
    return
  }

  if(step === 1) {
  
setErrors(validation({...form}));
    const  step1 = Object.values({images : errors.images ,  name : errors.name , location : errors.location , country : errors.country , address : errors.address});
  console.log(step1);
  if (step1.some(error => typeof error === "string")) {
    return
  } 
}

if(step === 2) {
  
  
  const  step2 = Object.values({bathrooms : errors.bathrooms , rooms : errors.rooms , totalArea : errors.totalArea , coveredArea : errors.coveredArea , rentPrice : errors.rentPrice , sellPrice : errors.sellPrice});
console.log(step2);
if (step2.some(error => typeof error === "string")) {
  return
} 
}

if(step === 3) {
  
  const  step3 = Object.values({description : errors.description });
console.log(step3);
if (step3.some(error => typeof error === "string")) {
  return
} 
}

  setStep(step + 1)
  
  return
};
  



const handleChange = (e) => {
  const {name} = e.target;
  const {value} = e.target;
   
    
  const errorDetect = validation({...form ,[name] : value})
  setErrors((prevError) => ({
   ...prevError, [name] : errorDetect[name]
  }))
  

    if(e.target.type === "number") {
      setForm({...form , [name] : Number(value)})
      return 
    };

    if(e.target.type === "checkbox") {
      setForm({...form , [name] : JSON.parse(value)})
      return
    };

    setForm({...form , [name] : value})
};

  const handleForm = async (e) => {
    
    e.preventDefault();
    await createAsset(form , setModal , setModalBody, setErrors, errors,  navigate);

    

      if(Array.isArray(modalBody.response)) {
            return setTimeout(() => {
              setModal(false)
              setStep(1)
            },1000)
          }
      else if(typeof modalBody.response === "object") {
        return setTimeout(() => {
         navigate("/home")
       }, 1500)
    }  

  };
  
  
console.log({modal :modal , modalbody : modalBody.response});


  useEffect(() => {
  
},[step])




  const MultiForm = (e) => {

  
  if(step === 1) {
    return (

    
    <form className="d-flex flex-row align-items-center justify-content-center text-center  ">
        <fieldset className={`border p-3 d-flex flex-column ${style.fieldset} `}>
            
              <h3 className="m-3 display-6" > Agrega una nueva propiedad </h3>
              <hr></hr>
              <div className="d-flex flex-row justify-content-center align-items-center">
              <div > 
                 <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFile(e.target.files[0])}
                  
                />
    
                <div className={`d-flex text-center justify-content-center align-items-center ${style.divDrop}`}
                   style={{ border: '2px dashed #ccc', margin : `20px 40px` ,textAlign: 'center', width: '400px', height: '250px'}}
                   onDragEnter={(e) => e.preventDefault()}
                   onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    /* onClick={() => document.getElementById('imageInput').click()} */
                  
                >
    
    {form.images.length > 0 ? (
            <Carousel style={{ width: '100%', height : "100%",maxHeight: '250px' }}>
              {form.images.map((imageUrl, index) => (
                <Carousel.Item key={index}>
                 
                  <img
                   className={style.carouselImage}
                   style={{height : "245px" , width : "100%", }}
                    src={imageUrl}
                    alt={`Image ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            'Arrastra y suelta la imagen aquí'
          )}
            
            </div>
            {errors.images ? <p style={{ color : "red"}}>{errors.images}</p> : null}
          </div>
          <div className="column">
          <div className="row justify-content-center ">
      
            <div className="col-md-6 text-center" >
              <label htmlFor="inputName" className="form-label ">Nombre de la propiedad</label>
              <input type="text" name="name" value={form.name} className="form-control mb-1" id="inputName" onChange={(e) => handleChange(e)} placeholder="Nombre de tu propiedad"/>
            </div>
            <div>{errors.name ? <p style={{color  : "red"}}>{errors.name}</p> : null}
            </div>
    
          </div>
        
          <div className="d-flex flex-row justify-content-around align-items-center">

            <div className="col-md-5 m-2 ">
              <label htmlFor="inputAddress" className="form-label ">Dirección</label>
              <input type="text" name="address" value={form.address}  className="form-control " id="inputAddress" placeholder="1234 Main St" onChange={(e) => handleChange(e)} required/>
             <div>{errors.address ? <p style={{color  : "red"}}>{errors.address}</p> : null}
            </div>
            </div>
           
    
            <div className="col-md-5 m-2 ">
              <label htmlFor="inputAddress2" className="form-label">Pais</label>
              <input type="text"  name="country" value={form.country}  className="form-control" id="inputAddress2" onChange={(e) => handleChange(e)} placeholder="Pais de locacion"/>
            <div>
              {errors.country ? <p style={{color  : "red"}}>{errors.country}</p> : null}
            </div>
            </div>
            
          </div>
    
      <div className="d-flex flex-row justify-content-center align-items-center ">
            <div className="col-md-5  ">
              <label htmlFor="inputCity" className="form-label">Locación</label>
              <input type="text" name="location" value={form.location} className="form-control" id="inputCity" onChange={(e) => handleChange(e)} placeholder="Cuidad" required/>
            <div>{errors.location ? <p style={{color  : "red"}}>{errors.location}</p> : null}
            </div>
            </div>
            
          </div>
      <hr></hr>
</div>
</div>
      <div className="col-md-3 container d-flex flex-column justify-content-center">
        
          <div className="col-12 text-center mt-4 mb-3">
            <button type={step === 3 ? "submit" : "button"} className={`ml-4 ${style.button}`} onClick={(e) => handleStep(e)}>Continuar</button>
          </div>

      </div>
    </fieldset>
  </form>
    )
  } else if(step === 2) {

    return (

      <form className="d-flex flex-column align-items-center   text-center">
          <fieldset className={`border p-4  m-5 ${style.fieldset} `} >
             <h2 className="mb-3 mt-3 display-6">Agrega sus características </h2>
            <hr></hr>
            <div className="d-flex  flex-row mt-2 m-3 " >
          
            <div className="column  mt-3">
              <div className="col-md-11">
              <label htmlFor="inputState" className="form-label">Tipo de propiedad</label>

              <select id="inputState" onChange={(e) => handleChange(e)} value={form.type} name="type" className="form-select">

                <option>Elije uno...</option>
                <option name="type" value="Departamento">Departamento</option>
                <option name="type" value="Casa">Casa</option>
                <option name="type" value="Hotel">Hotel</option>

              </select> 
          </div>

            <div className="col-md-11 mt-5">
                <label htmlFor="inputHab" className="form-label">N° de habitaciones</label>
                <input type="number" name="rooms" min="0" value={form.rooms} className="form-control" onChange={(e) => handleChange(e)} id="inputHab" required/>
                <div>{errors.rooms ? <p style={{color  : "red"}}>{errors.rooms}</p> : null}
            </div>
            </div>

            <div className="col-md-11 mt-5">
              <label htmlFor="inputBaño" className="form-label">N° de baños</label>
              <input type="number" name="bathrooms" min="0" value={form.bathrooms} className="form-control" onChange={(e) => handleChange(e)} id="inputBaño" required/>
              <div>{errors.bathrooms ? <p style={{color  : "red"}}>{errors.bathrooms}</p> : null}
            </div>
            </div>
          

        </div>

          <div className="column m-3">
          
            <fieldset className={`border p-3  ${style.fieldset2}`}>
            <label className="form-label">Esta a la venta?</label>

            <div className="form-check">
              <input type="checkbox" name="onSale" checked={selectedCkeckbox.onSale === "true"} onChange={(e) =>  {handleCheckbox(e); handleChange(e)}} className="form-check-input" id="checkbox1" value="true"/> 
              <label htmlFor="checkbox1" className="form-check-label" > YES</label>
            </div>

            <div className="form-check ">
              <input type="checkbox" name="onSale" checked={selectedCkeckbox.onSale === "false"} onChange={(e) =>  {handleCheckbox(e); handleChange(e)}} className="form-check-input" id="checkbox2" value="false"/> 
              <label htmlFor="checkbox2"  className="form-check-label" >NO </label>
            </div>

            <hr></hr>
            <label htmlFor="inputPark" className="form-label">Posee estacionamiento?</label>

              <div className="form-check">
                <label htmlFor="inputPark"  className="form-check-label"> SI </label>
                <input type="checkbox" name="parking" className="form-check-input" id="inputPark" onChange={(e) =>  {handleCheckbox(e); handleChange(e)}} value="true" checked={selectedCkeckbox.parking === "true"} />
              </div>

              <div className="form-check">
                <label htmlFor="inputPark" className="form-check-label"> NO </label>
                <input type="checkbox" name="parking"  className="form-check-input" id="inputPark" value="false" onChange={(e) =>  {handleCheckbox(e); handleChange(e)}} checked={selectedCkeckbox.parking === "false"} />
              </div>
          <hr></hr>

            <label htmlFor="inputTer" className="form-label">Posee terraza?</label>

              <div className="form-check">
                <input type="checkbox" name="terrace" className="form-check-input" id="inputTer" value="true" onChange={(e) =>  {handleCheckbox(e); handleChange(e)}} checked={selectedCkeckbox.terrace === "true"}></input>
                <label htmlFor="inputTer" className="form-check-label" > YES </label>
              </div>

              <div className="form-check">
              <input type="checkbox" name="terrace" className="form-check-input" id="inputTer" value="false" onChange={(e) =>  {handleCheckbox(e); handleChange(e)}} checked={selectedCkeckbox.terrace === "false"}></input>
              <label htmlFor="inputTer" className="form-check-label"> NO</label>
              </div>
            </fieldset>
           </div>
        </div>

        <div className="d-flex  flex-row justify-content-around  align-items-center">
          
        <div className="col-md-5 mt-3 p-1">
              <label htmlFor="inputArea" className="form-label">Mt²</label>
              <input type="number" name="coveredArea" min="0" value={form.coveredArea} className="form-control" onChange={(e) => handleChange(e)} id="inputArea" required/>
              <div>{errors.coveredArea ? <p style={{color  : "red"}}>{errors.coveredArea}</p> : null}
            </div>
            </div>  

            <div className="col-md-5 mt-3 p-1">
              <label htmlFor="inputCoveredArea" className="form-label">Mt² totales </label>
              <input type="number" name="totalArea" min="0" value={form.totalArea} className="form-control" onChange={(e) => handleChange(e)} id="inputCoveredArea" required/>
              <div>{errors.totalArea ? <p style={{color  : "red"}}>{errors.totalArea}</p> : null}
            </div>
            </div>
        </div>
          <div className="d-flex  flex-row justify-content-center align-items-center">
               
                <div className="col-md-5 m-3 p-1">
                    <label htmlFor="inputPriceR" className="input-label">Precio de Renta</label>
                    <input type="number" name="rentPrice" min="0" value={form.rentPrice} id="inputPriceR" className="form-control" onChange={(e) => {handleChange(e)}} ></input>
                    <div>{errors.rentPrice ? <p style={{color  : "red"}}>{errors.rentPrice}</p> : null}
            </div>
                </div> 

                <div className={`col-md-5 m-3 p-1 ${price  ?  "d-block" : "d-none"}`}>
                    <label htmlFor="inputPriceS"  className="input-label"> Precio de Venta </label>
                    <input type="number" id="inputPriceS" value={form.sellPrice} min="0" name="sellPrice" className=" form-control" onChange={(e) => {handleChange(e)}}></input>
                   
                </div>

          </div>
     <div className="col-md-3 container d-flex flex-column ">
        <div className=" d-flex flex-row align-items-center justify-content-around mt-4 ">

            <div className="m-2 ">
                <button type="button"  className={style.button}  value="prev" onClick={(e) => handleStep(e)}>Atras</button>
            </div>

            <div className="m-2">
                <button type={step === 3 ? "submit" : "button"} className={`ml-4 ${style.button}`} value="next" onClick={(e) => handleStep(e)}>{step === 3 ? "Agregar" : "Continuar"}</button>
              </div>

          </div>
        </div>

      </fieldset>
      </form>
    )

  } else if(step === 3 ) {
    return (

      

      <form className="d-flex flex-column align-items-center  text-center" onSubmit={handleForm}>
          <fieldset className={`border p-4  m-5 ${style.fieldset} `}>
              <legend className="mb-3 mt-3"> Especificaciones </legend>
              <hr></hr>
        
      
            <hr></hr>
            <div className="d-flex  text-center  mt-4 m-5" >

                  <div className="form-group ">
                    <label htmlFor="description" className="form-label"> Descripción</label>
                    <textarea className="form-control" value={form.description} rows="6" cols="50" name="description" onChange={(e) => handleChange(e)}></textarea>
                    <div>{errors.description ? <p style={{color  : "red"}}>{errors.description}</p> : null}
            </div>
                  </div>
            </div>
         
            <div className="col-md-3 container d-flex flex-column ">
              <div className=" d-flex flex-row align-items-center justify-content-around mt-2 ">

                <div className="m-3 ">
                    <button type="button"  className={style.button}  value="prev" onClick={(e) => handleStep(e)}>Atras</button>
                </div>

                <div className="m-3">
                <button type="submit" className={`ml-4 ${style.button}`} value="submit">Continuar</button>
                </div>

              </div>
            </div>
          </fieldset>
      </form>
    )
  }
  
};

return (
  <>
  
  {(modal && Array.isArray(modalBody.response)) ?
       <div className={style.container2}>
       <br></br>
        <br></br>

   <Modal show={modal}  centered>
  
    <Modal.Header className="d-flex justify-content-center ">
      <Modal.Title className="text-success text-danger" > Algo salió mal ❌ </Modal.Title>
    </Modal.Header>
    <Modal.Body className="w-auto">
      Intenta de nuevo !
      
    </Modal.Body>
    <Modal.Footer>
  
    </Modal.Footer>
  </Modal>
</div>


  : (modal && typeof modalBody.response === "object") ? 
      <div className={style.container2}>
         <br></br>
          <br></br>
  
     <Modal show={modal }  centered>
    
      <Modal.Header className="d-flex justify-content-center ">
        <Modal.Title className="text-success" >Creado con éxito ✅ </Modal.Title>
      </Modal.Header>
      <Modal.Body className="w-auto">{
        <Card
        name = {modalBody.response.name}
                description={modalBody.response.description}        
                address = {modalBody.response.address}
                location = {modalBody.response.location}
                country = {modalBody.response.country}
                images = {modalBody.response.images[0]}
                id = {modalBody.response.id}
          ></Card> 
      }</Modal.Body>
      <Modal.Footer>
    
      </Modal.Footer>
    </Modal>
 </div>
       

   : <div className={style.container}>
    {MultiForm()}
    </div> 
 }
  </>
  )
};

export default PropertyForm;
          
          
          //?----------------------------checkbox----------------------------------
    {/*            <fieldset className="border p-2 ">
          <div className="d-flex flex-row justify-content-around m-4  align-items-center">
              <label className="form-label" htmlFor="esp1"> Wifi?</label>
              <div className="column">
            <div className="form-check  ">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "yes"} onChange={handleCheckbox} className="form-check-input" id="esp1" value="yes"/> 
              <label htmlFor="esp1" className="form-check-label" > YES</label>
            </div>
            <div className="form-check">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "no"} onChange={handleCheckbox} className="form-check-input" id="esp1" value="no"/> 
              <label htmlFor="esp1"  className="form-check-label" >NO </label>
            </div>    
</div>

            <label className="form-label" htmlFor="esp2"> Lavadora?</label>
            <div className="column">
            <div className="form-check ">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "yes"} onChange={handleCheckbox} className="form-check-input" id="esp2" value="yes"/> 
              <label htmlFor="esp2" className="form-check-label" > YES</label>
            </div>
            <div className="form-check">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "no"} onChange={handleCheckbox} className="form-check-input" id="esp2" value="no"/> 
              <label htmlFor="esp2"  className="form-check-label" >NO </label>
            </div>
</div>
</div>
<div className="d-flex flex-row justify-content-around m-4  align-items-center ">
            <label className="form-label " htmlFor="esp3"> Cocina?</label>
            <div className="column">
            <div className="form-check ">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "yes"} onChange={handleCheckbox} className="form-check-input" id="esp3" value="yes"/> 
              <label htmlFor="esp3" className="form-check-label " > YES</label>
            </div>
            <div className="form-check ">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "no"} onChange={handleCheckbox} className="form-check-input" id="esp3" value="no"/> 
              <label htmlFor="esp3"  className="form-check-label" >NO </label>
            </div>
</div>

            <label className="form-label" htmlFor="esp4"> Perchas?</label>
            <div className="column">
            <div className="form-check ">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "yes"} onChange={handleCheckbox} className="form-check-input" id="esp4" value="yes"/> 
              <label htmlFor="esp4" className="form-check-label" > YES</label>
            </div>
            <div className="form-check">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "no"} onChange={handleCheckbox} className="form-check-input" id="esp4" value="no"/> 
              <label htmlFor="esp4"  className="form-check-label" >NO </label>
            </div>
        </div>
</div>
      <div className="col m-5">
        <label htmlFor="esp5" className="form-label"> Algo mas que quieras agregar ?</label>
        <input id="esp5" className="form-control" ></input>
      </div>
</fieldset>  */}