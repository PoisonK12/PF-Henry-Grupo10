import axios from "axios";
import { GET_ALL_PROPERTIES } from "./types";


export const getAllProperties = () => {
    return async(dispatch) => {
        try {
            const {data} = await axios("/assets?size=10&page=1")
            return dispatch({
                type: GET_ALL_PROPERTIES,
                payload: data
            })
        } catch (error) {
            
        }
    }
}

export const createAsset = async (form) => {

    try {                         
     const {data} = await axios.post("/assets/create" , form);
     if(data) {
        alert(data)
       return
     }
    } catch (error) {
     return console.log(error.response);
    }
 };