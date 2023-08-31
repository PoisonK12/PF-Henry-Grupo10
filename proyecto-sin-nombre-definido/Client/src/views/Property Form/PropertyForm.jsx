import React, {useState , useEffect} from "react";
import style from "./PropertyForm.module.css"
import { useNavigate } from "react-router";
import { Carousel } from "react-bootstrap";


const PropertyForm = () => {


  const [image, setImage] = useState([]);
  const [step , setStep] = useState(1);
  const [selectedCkeckbox , setSelectedCheckbox] = useState({venta : "" , estacionamiento : "" , terraza : ""})
  const [form , setForm] = useState({
    name : "",
    image : "",

  })
  
  const navigate = useNavigate()

  const handleCheckbox = (e) => {
      setSelectedCheckbox({...selectedCkeckbox, [e.target.name] : e.target.value})
  }

  
  // Función para manejar el evento de soltar la imagen
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file)
  
    
  };

  // Función para manejar el archivo seleccionado
  const handleFile = (file) => {
    // Realizar las acciones necesarias con el archivo
    const imageURL = URL.createObjectURL( new Blob([file]));
    setImage([... image , imageURL]);
    console.log(image);
  };

const handleStep = (e) => {
  e.preventDefault()
  if(e.target.value === "prev") {
    setStep(step - 1)
    console.log(step);
    return
  }
  setStep(step + 1)
  console.log(step);
  return
};

const handleChange = (e) => {
  const {name} = e.target;
  const {value} = e.target;

    setForm({...form , [name] : value})
};



useEffect(() => {
},[step])

const handleSubmit = (e) => {
  
  navigate("/home");
  console.log({msg : "creado con exito :", prop : form });
};


const MultiForm = (e) => {
  
  if(step === 1) {
    return (

    
    <form className="d-flex flex-column align-items-center text-center  ">
        <fieldset className={`border p-2  ${style.fieldset} `}>
          
              <h3 className="m-3"> Agrega una nueva propiedad </h3>
              <hr></hr>

          <div className="row justify-content-center ">
      
            <div className="col-md-5 text-center" >
              <label htmlFor="inputEmail4" className="form-label">Nombre</label>
              <input type="text" name="name" className="form-control mb-2" id="inputEmail4" placeholder="Nombre de tu propiedad"/>
            </div>
    
          </div>

          <div className="d-flex flex-row justify-content-around align-items-center">

            <div className="col-md-5 m-3 p-1">
              <label htmlFor="inputAddress" className="form-label">Dirección</label>
              <input type="text" className="form-control " id="inputAddress" placeholder="1234 Main St" required/>
            </div>
    
            <div className="col-md-5 m-3 p-1">
              <label htmlFor="inputAddress2" className="form-label">Pais</label>
              <input type="text" className="form-control" id="inputAddress2" placeholder="Pais de locacion"/>
            </div>
          </div>
    
          <div className="d-flex flex-row justify-content-around align-items-center">
            <div className="col-md-5 m-3 p-1" >                       
              <label htmlFor="inputProv" className="form-label">Provincia</label>
              <input type="text" className="form-control" id="inputProv" placeholder="Provincia " required/>
            </div>
                
            <div className="col-md-5 m-3 p-1">
              <label htmlFor="inputCity" className="form-label">Cuidad</label>
              <input type="text" className="form-control" id="inputCity" placeholder="Cuidad  " required/>
            </div>
          </div>
          <div className="row justify-content-center mt-4 ">

          <div className="col-md-4 d-flex flex-column align-items-center text-center ">
           
              <label htmlFor="inputZip" className="form-label">Codigo Postal</label>
               <input type="number" className="form-control " id="inputZip"/>
               </div>

          </div>
  
      <hr></hr>

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
             <legend className="mb-4">Agrega sus características </legend>
            <hr></hr>
            <div className="d-flex  flex-row mt-4 m-3 " >
          
            <div className="column  mt-3">
              <div className="col-md-11">
              <label htmlFor="inputState" className="form-label">Tipo de propiedad</label>

              <select id="inputState" className="form-select">

                <option value="">Elije uno...</option>
                <option name="type" value="Departamento">Departamento</option>
                <option name="type" value="Casa">Casa</option>
                <option name="type" value="Hotel">Hotel</option>

              </select> 
          </div>

            <div className="col-md-11 mt-4">
                <label htmlFor="inputHab" className="form-label">N° de habitaciones</label>
                <input type="number" className="form-control" id="inputHab" required/>
            </div>

            <div className="col-md-11 mt-4">
              <label htmlFor="inputBaño" className="form-label">N° de baños</label>
              <input type="number" className="form-control" id="inputBaño" required/>
            </div>
        </div>

          <div className="column m-3">
          
            <fieldset className={`border p-2  ${style.fieldset2}`}>
            <label className="form-label">Esta a la venta?</label>

            <div className="form-check">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "yes"} onChange={handleCheckbox} className="form-check-input" id="checkbox1" value="yes"/> 
              <label htmlFor="checkbox1" className="form-check-label" > YES</label>
            </div>

            <div className="form-check">
              <input type="checkbox" name="venta" checked={selectedCkeckbox.venta === "no"} onChange={handleCheckbox} className="form-check-input" id="checkbox2" value="no"/> 
              <label htmlFor="checkbox2"  className="form-check-label" >NO </label>
            </div>


            <label htmlFor="inputPark" className="form-label">Posee estacionamiento?</label>

              <div className="form-check">
                <label htmlFor="inputPark"  className="form-check-label"> SI </label>
                <input type="checkbox" name="estacionamiento" className="form-check-input" id="inputPark" value="yes" checked={selectedCkeckbox.estacionamiento === "yes"} onChange={handleCheckbox}/>
              </div>

              <div className="form-check">
                <label htmlFor="inputPark" className="form-check-label"> NO </label>
                <input type="checkbox" name="estacionamiento"  className="form-check-input" id="inputPark" value="no" checked={selectedCkeckbox.estacionamiento === "no"} onChange={handleCheckbox}/>
              </div>


            <label htmlFor="inputTer" className="form-label">Posee terraza?</label>

              <div className="form-check">
                <input type="checkbox" name="terraza" className="form-check-input" id="inputTer" value="yes" checked={selectedCkeckbox.terraza === "yes"} onChange={handleCheckbox}></input>
                <label htmlFor="inputTer" className="form-check-label" > YES </label>
              </div>

              <div className="form-check">
              <input type="checkbox" name="terraza" className="form-check-input" id="inputTer" value="no" checked={selectedCkeckbox.terraza === "no"} onChange={handleCheckbox}></input>
              <label htmlFor="inputTer" className="form-check-label"> NO</label>
              </div>

            </fieldset>
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

      <form className="d-flex flex-column align-items-center   text-center">
          <fieldset className={`border p-4  m-5 ${style.fieldset} `}>
              <legend className="mb-3 mt-3"> Especificaciones </legend>
              <hr></hr>
        <div > 
                 <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFile(e.target.files[0])}
                  
                />
    
                <div className="d-flex text-center justify-content-center bg-light align-items-center"
                   style={{ border: '2px dashed #ccc', margin : `20px 40px` ,textAlign: 'center', width: '500px', height: '250px'}}
                   onDragEnter={(e) => e.preventDefault()}
                   onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    /* onClick={() => document.getElementById('imageInput').click()} */
                  
                >
    
    {image.length > 0 ? (
            <Carousel>
              {image.map((imageUrl, index) => (
                <Carousel.Item key={index}>
                 
                  <img
                   className={style.carouselImage}
                   style={{height : "100%" , width : "100%", objectFit : "cover"}}
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
          </div>
      
            <hr></hr>
            <div className="d-flex  text-center  mt-4 m-5" >

                  <div className="form-group ">
                    <label htmlFor="description" className="form-label"> Descripción</label>
                    <textarea className="form-control" rows="6" cols="50" name="description"></textarea>
                  </div>
            </div>
         
            <div className="col-md-3 container d-flex flex-column ">
              <div className=" d-flex flex-row align-items-center justify-content-around mt-2 ">

                <div className="m-3 ">
                    <button type="button"  className={style.button}  value="prev" onClick={(e) => handleStep(e)}>Atras</button>
                </div>

                <div className="m-3">
                <button type={step === 3 ? "submit" : "button"} className={`ml-4 ${style.button}`} value={step === 3 ? "submit" : "next"} onClick={(e) => handleStep(e)}>{step === 3 ? "Agregar" : "Continuar"}</button>
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
  <div className={style.container}>
 {/*  <ul id="progressbar">
                <li class="active">Personal Details</li>
                <li>Social Profiles</li>
                <li>Account Setup</li>
            </ul> */}
  {MultiForm()}
  </div>
  </>
  )
};

export default PropertyForm;















{/* <div > 
                 <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFile(e.target.files[0])}
                  
                />
    
                <div className="d-flex text-center justify-content-center bg-light align-items-center"
                   style={{ border: '2px dashed #ccc', margin : `20px 20px` ,textAlign: 'center', width: '500px', height: '250px'}}
                   onDragEnter={(e) => e.preventDefault()}
                   onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('imageInput').click()}
                  
                >
    
              {image 
               ? (<img src={URL.createObjectURL(image)} alt="Dropped" style={{ width: '100%', height: '100%' , objectFit : "cover" }} />)
              : ('Arrastra y suelta la imagen aquí')}
              
            </div>
          </div> */}
          
          
          
          
          
          //?----------------------------checkbox----------------------------------
       /*           <fieldset className="border p-2 ">
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
</fieldset> */