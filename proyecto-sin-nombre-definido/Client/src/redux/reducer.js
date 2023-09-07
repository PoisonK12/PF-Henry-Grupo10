import { GET_ALL_PROPERTIES,GET_ALL_USERS, DELETE_USER_BY_ID, GET_ASSET_BY_ID, GET_LOCATIONS, SEARCH_BY_LOCATION, PUT_PROPERTY, GET_ALL_ALL_PROPERTIES, SEARCH_BY_FILTER, GET_COUNTRIES, GET_STATES} from "./types"

const initialState = {
    properties: [],
    propertiesCopy: [],
    location: [],
    users: [],
    detail: {},
    countries: [],
    cities: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){

        // case GET_ALL_PROPERTIES:
        //     return {...state, properties: action.payload}

        case GET_ALL_ALL_PROPERTIES:
            return {...state, propertiesCopy: action.payload , properties: action.payload}
        
        case GET_ALL_USERS:
            return {...state, users: action.payload}
        
        case DELETE_USER_BY_ID:
            return {...state, users: action.payload}

        case SEARCH_BY_LOCATION:
            return {...state, properties: action.payload}

        case GET_ASSET_BY_ID:
            return {...state, detail: action.payload}

        case GET_LOCATIONS:
            console.log(action.payload)
            return {...state, location: action.payload}
        case PUT_PROPERTY:
            return {...state, properties: action.payload}
        case SEARCH_BY_FILTER:
            return {...state, properties:action.payload}
        case GET_COUNTRIES:
            return {...state, countries:action.payload}
        case GET_STATES:
            return {...state, states: action.payload}
        default:
            return state
    }
}

export default rootReducer