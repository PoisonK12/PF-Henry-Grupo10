import axios, { Axios } from "axios";
import {
  GET_ALL_PROPERTIES,
  GET_ASSET_BY_ID,
  GET_LOCATIONS,
  SEARCH_BY_LOCATION,
  PUT_PROPERTY,
  GET_ALL_ALL_PROPERTIES,
  SEARCH_BY_FILTER,
  DELETE_ASSET_BY_ID,
  GET_LOGIN,
  GET_COUNTRIES,
  GET_STATES
} from "./types";

export const getAllProperties = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/assets?size=10&page=${page}`);
      return dispatch({
        type: GET_ALL_PROPERTIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllReallyProperties = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        "/assets/menosmalquediegodijoquenonosllenemosderutas"
      );
      return dispatch({
        type: GET_ALL_ALL_PROPERTIES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAssetById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/assets/" + id);
      return dispatch({
        type: GET_ASSET_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const SearchByLocation = (query, page) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `/assets?size=10&page=${page}&location=${query}`
      );
      console.log(data);
      return dispatch({
        type: SEARCH_BY_LOCATION,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createAsset = async (form , setModal,setModalBody, navigate, setStep ,setConditionalCreate) => {

    try {                         
     const {data} = await axios.post("/assets/create" , form);
     if(data) {
        console.log(data);
         setModalBody({response: data ,message : "true"})
         setConditionalCreate(true)
         setTimeout(() => {
           setModal(false) 
           navigate("/home")
           return 
         }, 1000)
         return
     }
    } catch (error) {
      
      if( error.response.data.error.includes("propiedad")) {
        setModalBody(error.response.data.error);
        setTimeout(() => {
          setModal(false)
          setStep(1)
        }, 1500)
        return
      } 
        setModalBody({ response :  JSON.parse(error.response.data.error)});
      
      setModal(true)
     return console.log(error);
    }
  } 

export const getLocation = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/assets/location");
      console.log(data);
      return dispatch({
        type: GET_LOCATIONS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const putProperty = (id, form) => {
  console.log(id, form);
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/assets/${id}`, form);
      return dispatch({
        type: PUT_PROPERTY,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchByFilter = ({
  location,
  rooms,
  bathrooms,
  onSale,
  rentPriceMax,
  rentPriceMin,
  sellPriceMax,
  sellPriceMin,
}) => {
  return async(dispatch) => {
    try {
      if(rooms == 0) rooms = ""
      if(bathrooms == 0) bathrooms = ""
      if(onSale == false) onSale = ""
      if(rentPriceMax == 0) rentPriceMax = ""
      if(rentPriceMin == 0) rentPriceMin = ""
      if(sellPriceMax == 0) sellPriceMax = ""
      if(sellPriceMin == 0) sellPriceMin = ""
      const {data} = await axios(`/assets?size=10&page=1&location=${location}&rooms=${rooms}&bathrooms=${bathrooms}&onSale=${onSale}&rentPriceMax=${rentPriceMax}&rentPriceMin=${rentPriceMin}&sellPriceMax=${sellPriceMax}&sellPriceMin=${sellPriceMin}`)
      console.log(data)
      return dispatch({
        type: SEARCH_BY_FILTER,
        payload: data
      })
    } catch (error) {
      
    }
  }
}

// Acción para eliminar una propiedad por su ID
export const deleteAssetById = (id) => {
  return async (dispatch) => {
    try {
      // Realiza la solicitud de eliminación al servidor
      await axios.delete(`/assets/delete/${id}`);

      // Si la eliminación fue exitosa, despacha la acción para actualizar el estado
      dispatch({
        type: DELETE_ASSET_BY_ID,
        payload: id, // Puedes enviar el ID de la propiedad eliminada como payload
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCountries = () => {
  return async (dispatch) => {
    const {data} = await axios("https://countriesnow.space/api/v0.1/countries/")
    dispatch({
      type: GET_COUNTRIES,
      payload: data
    })
  }
}

export const getStates = (country) => {
  try {
    
   
      const {data} = axios.post("https://countriesnow.space/api/v0.1/countries/states", country)
      dispatch({
        type: GET_STATES,
        payload: data
      })
  } catch (error) {
   console.log(error) 
  }
}



 export const getLogin = async (login , conditional , setToast,setToastBody) => {
   const {email , password , confirmPassword , userName , fullName , birthDate , gender , address , nationality , phoneNumber , landLord} = login;
   
   try {
     
     if (conditional === "login"){
         const {data} = await axios.get("/users" , {email , password})
         if(data) {
         
          /* setToastBody({response :data}) */
          setToast(true)
         return ;
         }
      }

      if(conditional === "register") {
          const {data} = await axios.post("/users", {email, password , confirmPassword , userName , fullName,verificationNumber : "56" , birthDate , gender , address , nationality , phoneNumber , landLord } )
          if(data) {
            console.log(data);
           /*  setToastBody({response :data}) */
            setToast(true)
            return console.log(data);
          }    
          }
        
  } catch (error) {
    setToastBody(error.message)
    setToast(true)
    return 
  }
}