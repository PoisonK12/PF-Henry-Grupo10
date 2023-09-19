import axios, { Axios } from "axios";
import {
  GET_ALL_PROPERTIES,
  GET_ASSET_BY_ID,
  GET_LOCATIONS,
  SEARCH_BY_LOCATION,
  PUT_PROPERTY,
  PUT_USER,
  GET_ALL_ALL_PROPERTIES,
  SEARCH_BY_FILTER,
  DELETE_ASSET_BY_ID,
  GET_LOGIN,
  GET_COUNTRIES,
  GET_AMENITIES,
  DELETE_USER_BY_ID,
  DELETE_LOGIC_ASSET_BY_ID,
  GET_ALL_USERS,
  GET_STATES,
  GET_PROPERTIES_BY_USER,
  GET_ALL_CONTACT,
  DELETE_CONTACT_BY_ID,
  GET_USER_BY_ID,
  DELETE_LOGIC_USER_BY_ID,
  RESTORE_USER_BY_ID,
  FAV_USER_PROPERTY,
  GET_REVIEWS,
  GET_ALL_FAV_USER_PROPERTY,
  DELETE_FAV_USER_PROPERTY
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
export const getAllContact = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/contact/`);
      return dispatch({
        type: GET_ALL_CONTACT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllReallyProperties = ({ order}, page) => {
  return async (dispatch) => {
    try {
      const { data } = await axios( `/assets?size=10&page=${page}&${order}=yes`);
      return dispatch({
        type: GET_ALL_ALL_PROPERTIES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllUsers = ({search, order}) => {
  if(!search) search = ""
  if(order == "") order = "userNameAsc"

  return async (dispatch) => {
    try {
      const { data } = await axios(`/users?search=${search}&${order}=si`);
      dispatch({
        type: GET_ALL_USERS,
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

export const getAmenities = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/amenities");
      return dispatch({
        type: GET_AMENITIES,
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
        `/assets?size=10&page=${page}&location=${query}&rentPriceAsc=yes`
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
export const createContact = async (form) => {
  try {
    const { data } = await axios.post("/contact/", form);
    alert("Enviado con exito");
  } catch (error) {
    console.error(error);
  }
};

export const createAsset = async (
  form,
  setModal,
  setModalBody,
  navigate,
  setStep,
  setConditionalCreate
) => {
  try {
    const { data } = await axios.post("/assets/create", form);
    if (data) {
      console.log(data);
      setModalBody({ response: data, message: "true" });
      setConditionalCreate(true);
      setTimeout(() => {
        setModal(false);
        navigate("/detail/" + data.id);
      }, 1000);

      return;
    }
  } catch (error) {
    if (error.response.data.error.includes("propiedad")) {
      setModalBody(error.response.data.error);
      setTimeout(() => {
        setModal(false);
        setStep(1);
      }, 1500);
      return;
    }
    setModalBody({ response: JSON.parse(error.response.data.error) });

    setModal(true);
    return console.log(error);
  }
};

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

export const putUser = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/users`,form );
      console.log(data)
      return dispatch({
        type: PUT_USER,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const favUserProperty = (idUser, idAsset) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/favorites/like', { userId: idUser, assetId: idAsset });
      console.log('favinfo', data);
      return dispatch({
        type: FAV_USER_PROPERTY,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteFavUserProperty = (idUser, idAsset) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/favorites/unlike', { userId: idUser, assetId: idAsset });
      return dispatch({
        type: DELETE_FAV_USER_PROPERTY,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const getAllFavUserProps = (id) => {
  return async (dispatch)=> {
    try {
      const data = await axios(`/favorites?userId=${id}`)
      console.log(data)
      return dispatch({
        type:GET_ALL_FAV_USER_PROPERTY,
        payload: data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const searchByFilter = (
  {
    location,
    rooms,
    bathrooms,
    onSale,
    rentPriceMax,
    rentPriceMin,
    sellPriceMax,
    sellPriceMin,
    order,
    amenities,
    page
  },
) => {
  return async (dispatch) => {
    try {
      if (order == "") order = "rentPriceAsc";
      if (rooms == 0) rooms = "";
      if (bathrooms == 0) bathrooms = "";
      if (rentPriceMax == 1000) rentPriceMax = "";
      if (rentPriceMin == 0) rentPriceMin = "";
      if (sellPriceMax == 1000) sellPriceMax = "";
      if (sellPriceMin == 0) sellPriceMin = "";
      // if (amenities.length == 0) amenities = ""
      const mapAmen = Array.isArray(amenities) && amenities.length > 0
        ? `&amenities=${amenities.join("&amenities=")}`
        : '';
        
      console.log("KJDASJKDSAJK",amenities)

      // console.log("BLABLABLA",searchAmen)

      const { data } = await axios(
        `/assets?size=10&page=${page}&location=${location}&rooms=${rooms}&bathrooms=${bathrooms}&onSale=${onSale}&rentPriceMax=${rentPriceMax}&rentPriceMin=${rentPriceMin}&sellPriceMax=${sellPriceMax}&sellPriceMin=${sellPriceMin}&${order}=yes${mapAmen}`
      );
      console.log(data);
      return dispatch({
        type: SEARCH_BY_FILTER,
        payload: data,
      });
    } catch (error) {}
  };
};

export const deleteAssetById = (id) => {
  return async (dispatch) => {
    try {
      // Realiza la solicitud de eliminación al servidor
      await axios.delete(`/assets/${id}`);

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

// Acción para eliminar una propiedad por su ID
export const deleteLogicAssetById = (id) => {
  return async (dispatch) => {
    try {
      // Realiza la solicitud de eliminación al servidor
      await axios.delete(`/assets/delete/${id}`);

      // Si la eliminación fue exitosa, despacha la acción para actualizar el estado
      dispatch({
        type: DELETE_LOGIC_ASSET_BY_ID,
        payload: id, // Puedes enviar el ID de la propiedad eliminada como payload
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteLogicUserById = (id) => {
  return async (dispatch) => {
    try {
      // Realiza la solicitud de eliminación al servidor
      await axios.delete(`/users/delete/${id}`);

      // Si la eliminación fue exitosa, despacha la acción para actualizar el estado
    } catch (error) {
      console.error(error);
    }
  };
};

export const restoreUserById = (id) => {
  return async (dispatch) => {
    try {
      await axios.get(`/users/restore/${id}`)
     
    } catch (error) {
      console.error(error);
    
    }
  }
}

export const deleteMessageById = (id) => {
  return async (dispatch) => {
    try {
      // Realiza la solicitud de eliminación al servidor
      await axios.delete(`/contact/${id}`);

      // Si la eliminación fue exitosa, despacha la acción para actualizar el estado
      dispatch({
        type: DELETE_C_BY_ID,
        payload: id, // Puedes enviar el ID de la propiedad eliminada como payload
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteUserById = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/users/${id}`);
      dispatch({
        type: DELETE_USER_B_ID,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCountries = () => {
  return async (dispatch) => {
    const { data } = await axios(
      "https://countriesnow.space/api/v0.1/countries/"
    );
    dispatch({
      type: GET_COUNTRIES,
      payload: data,
    });
  };
};

export const getStates = (country) => {
  try {
    const { data } = axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      country
    );
    dispatch({
      type: GET_STATES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};



export const getLogin = async (
  login,
  setToastBody,
  setToast,
  navigate,
  setErrors,
  typeForm
) => {
  console.log(typeForm);

  const {
    email,
    password,
    userName,
    fullName,
    birthDate,
    gender,
    address,
    nationality,
    phoneNumber,
    verificationNumber,
    landlord,
    profilePic,
  } = login;

  if (typeForm === "login") {
    try {
      const { data } = await axios.post("/login", { email, password });
      console.log(data);
      setToastBody({ success: data.success, data: data });
      setToast(true);
      localStorage.setItem("log", JSON.stringify(data.token));
      localStorage.setItem("data", JSON.stringify(data.data));
      console.log("local", localStorage);
      setTimeout(() => {
        setToast(false);
        navigate("/home");
      }, 1000);
      return;
    } catch (error) {
      console.log(error);
      setToastBody({ success: error.response.data.success });
      setErrors({ errorBack: error.response.data.msg });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
    }
  }

  //?-------- crear una variable para cada formulario asi se diferencian ------------------------
  if (typeForm === "register") {
    try {
      const { data } = await axios.post("/users/create", {
        email,
        password,
        userName,
        fullName,
        verificationNumber,
        birthDate,
        gender,
        address,
        nationality,
        phoneNumber,
        profilePic,
        landlord,
        userType: "User",
      });
      if (data) {
        localStorage.setItem("log", JSON.stringify(data.token));
        localStorage.setItem("data", JSON.stringify(data.data));

        setToastBody({ response: data });
        setToast(true);
        setTimeout(() => {
          setToast(false);
          navigate("/home");
        }, 1500);
        return;
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error.includes("sintaxis")) {
        setToastBody({ response: "Faltan datos!" });
      } else if (error.response.data.error.includes("Validation Error")) {
        setToastBody({ response: "Ese correo ya esta en uso!" });
      }
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
      return;
    }
  }
};

export const getPropertyByUser = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios(`assets/myassets/${id}`)
      dispatch({
        type: GET_PROPERTIES_BY_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const setBookingDate = async (booking, setReserv , setBookingId , setErrors)  => {
      try {
          const res = await axios.post("/rents/reserva", booking);
          if(res.data.includes("-")) {
            setReserv(true)
            setBookingId(res.data)
            console.log(res.data);
            return
          } 
            setReserv(false);
            setErrors(res.data)
            console.log(res.data);
          return
      } catch (error) {
        return console.log(error);
      }
};


export const handleReserv = async (bookingId) => {

    try {
      const res = await axios.post(`/rents/create/${bookingId}`);
      if(res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
};

export const  getPayment = async (asset,  setPaymentSuccess, setButtonReserv ) => {
  const {name , description , price} = asset;
    try {
      const data = await axios.post("/pay/create-checkout-session" , {name : name , description : description , price : price})
     
      if(data) {
       console.log(data.data);
        var width = 500;
        var height = 600;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        const options = `width=${width}, height=${height}, left=${left}, top=${top}, location=no, toolbar=no`;
        var payment = window.open(data.data, '_blank', options);
        
        var intervalID = setInterval(() => {
          
          if(payment.closed) {
            clearInterval(intervalID);
            setPaymentSuccess(true);
            setButtonReserv(false);
          }
        }, 100)
      }

    } catch (error) {
      return console.log(error);
    }
};

export const reviewsPut = async (form , condicional) =>{
  console.log("aapa", form)
  
    try {
      const {data} = await axios.put(`/reviews/${condicional}/`, form)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  
}

export const reviewsGet = (id) => {
  return async (dispatch) =>{
    try {
      const {data} = await axios("/reviews/"+ id)
      console.log(data)
      return dispatch({
        type: GET_REVIEWS,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}