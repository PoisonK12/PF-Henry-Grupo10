import { GET_ALL_PROPERTIES, GET_ASSET_BY_ID} from "./types"

const initialState = {
    properties: [],
    users: [],
    detail: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){

        case GET_ALL_PROPERTIES:
            return {...state, properties: action.payload}


        case GET_ASSET_BY_ID:
            return {...state, detail: action.payload}
        default:
            return state
    }
}

export default rootReducer