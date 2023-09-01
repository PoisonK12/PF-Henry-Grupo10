import axios from "axios";
import { GET_ALL_PROPERTIES, GET_ASSET_BY_ID } from "./types";


export const getAllProperties = (page) => {
    return async(dispatch) => {
        try {
            const {data} = await axios(`/assets?size=10&page=${page}`)
            return dispatch({
                type: GET_ALL_PROPERTIES,
                payload: data
            })
        } catch (error) {
            console.log(error);   
        }
    }
}

export const getAssetById = (id) => {
    return async(dispatch) => {
        try {
            const {data} = await axios("/assets/" + id)
            return dispatch({
                type:GET_ASSET_BY_ID,
                payload: data
            })
        } catch (error) {
            console.log(error);   
        }
    }
}


export const createAsset = async (form) => {

    try {                         
     const {data} = await axios.post("/assets/create" , form);
     if(data) {
       return console.log(data);
     }
    } catch (error) {
     return console.log(error.response.data.request);
    }
 };