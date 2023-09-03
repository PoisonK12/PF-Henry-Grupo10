import axios from "axios";
import {
  GET_ALL_PROPERTIES,
  GET_ASSET_BY_ID,
  GET_LOCATIONS,
  SEARCH_BY_LOCATION,
  PUT_PROPERTY,
  GET_ALL_ALL_PROPERTIES,
  SEARCH_BY_FILTER,
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

export const createAsset = async (form, setModal, setModalBody) => {
  try {
    const { data } = await axios.post("/assets/create", form);
    if (data) {
      setModalBody({ response: data });
      setModal(true);
      console.log(data);
    }
  } catch (error) {
    setModalBody({ response: error.response.data });

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
};
