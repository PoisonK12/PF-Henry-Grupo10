import { GET_ALL_PROPERTIES } from "./types"

const initialState = {
    properties: [],
    users: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){

        case GET_ALL_PROPERTIES:
            return {...state, properties: action.payload}



        default:
            return state
    }
}

export default rootReducer