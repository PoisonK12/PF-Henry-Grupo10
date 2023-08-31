import axios from "axios";
import { GET_ALL_PROPERTIES, GET_ASSET_BY_ID } from "./types";


export const getAllProperties = () => {
    return async(dispatch) => {
        try {
            const {data} = await axios("/assets/")
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