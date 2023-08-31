import axios from "axios";
import { GET_ALL_PROPERTIES } from "./types";


export const getAllProperties = () => {
    return async(dispatch) => {
        try {
            const {data} = await axios("/assets/")
            return dispatch({
                type: GET_ALL_PROPERTIES,
                payload: data
            })
        } catch (error) {
            
        }
    }
}