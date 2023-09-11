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
  GET_AMENITIES,
  DELETE_USER_BY_ID,
  GET_ALL_USERS,
  GET_STATES,
  GET_PROPERTIES_BY_USER,
  GET_ALL_CONTACT,
  DELETE_CONTACT_BY_ID
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
      })
    } catch (error) {
      console.log(error);
    }
  }
}
export const getAllReallyProperties = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/assets/admin");
      return dispatch({
        type: GET_ALL_ALL_PROPERTIES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/users?userNameAsc=si");
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
export const createContact = async(form) => {
  try {
    const {data} = await axios.post("/contact/" , form);
    alert('Enviado con exito')
  } catch (error) {
    console.error(error);
  }
}

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
        navigate("/home");
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
  },
  page
) => {
  return async (dispatch) => {
    try {
      if (order == "") order = "rentPriceAsc";
      if (rooms == 0) rooms = "";
      if (bathrooms == 0) bathrooms = "";
      if (onSale == false) onSale = "";
      if (rentPriceMax == 0) rentPriceMax = "";
      if (rentPriceMin == 0) rentPriceMin = "";
      if (sellPriceMax == 0) sellPriceMax = "";
      if (sellPriceMin == 0) sellPriceMin = "";
      const { data } = await axios(
        `/assets?size=10&page=${page}&location=${location}&rooms=${rooms}&bathrooms=${bathrooms}&onSale=${onSale}&rentPriceMax=${rentPriceMax}&rentPriceMin=${rentPriceMin}&sellPriceMax=${sellPriceMax}&sellPriceMin=${sellPriceMin}&${order}=yes`
      );
      console.log(data);
      return dispatch({
        type: SEARCH_BY_FILTER,
        payload: data,
      });
    } catch (error) {}
  };
};

// Acción para eliminar una propiedad por su ID
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
}

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

  console.log(typeForm);
  if (typeForm === "login") {
    try {
      const { data } = await axios.post("/login", { email, password });
      console.log(data);
      setToastBody({ success: data.success, data: data });
      setToast(true);
      localStorage.setItem("log", JSON.stringify(data.token));
      localStorage.setItem("data", JSON.stringify(data.data))
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
        localStorage.setItem("data", JSON.stringify(data.data))

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
      setToastBody({ response: error.message });
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
        type:GET_PROPERTIES_BY_USER,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}