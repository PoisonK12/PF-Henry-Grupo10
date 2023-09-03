import axios from "axios";
import {
  GET_ALL_PROPERTIES,
  GET_ASSET_BY_ID,
  GET_LOCATIONS,
  SEARCH_BY_LOCATION,
  PUT_PROPERTY
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

export const SearchByLocation = (query) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/assets?size=10&page=1&location=${query}`);
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

export const createAsset = async (form , setModal,setModalBody ) => {

    try {                         
     const {data} = await axios.post("/assets/create" , form);
     if(data) {
         setModalBody({response: data})
         setModal(true);
         console.log(data);
     }
    } catch (error) {
        setModalBody({ response :  JSON.parse(error.response.data.error)});
      
      setModal(true)
     return console.log(error);
    }
  } 



export const getLocation = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/assets/location");
      console.log(data)
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
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/assets/${id}`, form)
      return dispatch({
        type: PUT_PROPERTY,
        payload: data
      })
    } catch (error) {
      console.error(error);
    }
  }
}
