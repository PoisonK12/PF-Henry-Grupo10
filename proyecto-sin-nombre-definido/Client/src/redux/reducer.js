import { GET_ALL_PROPERTIES, GET_ASSET_BY_ID, GET_LOCATIONS, SEARCH_BY_LOCATION, PUT_PROPERTY} from "./types"

const initialState = {
    properties: [],
    location: [],
    users: [],
    detail: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){

        case GET_ALL_PROPERTIES:
            return {...state, properties: action.payload}

        case SEARCH_BY_LOCATION:
            return {...state, properties: action.payload}

        case GET_ASSET_BY_ID:
            return {...state, detail: action.payload}

        case GET_LOCATIONS:
            console.log(action.payload)
            return {...state, location: action.payload}
        case PUT_PROPERTY:
            return {...state, properties: action.payload}
        default:
            return state
    }
}

export default rootReducer