import { GET_ALL_PROPERTIES, DELETE_LOGIC_ASSET_BY_ID,DELETE_LOGIC_USER_BY_ID,GET_ASSET_BY_ID,GET_ALL_USERS, DELETE_USER_BY_ID, GET_LOCATIONS, SEARCH_BY_LOCATION, PUT_PROPERTY, GET_ALL_ALL_PROPERTIES, SEARCH_BY_FILTER, GET_COUNTRIES, GET_STATES, GET_AMENITIES, GET_PROPERTIES_BY_USER, GET_ALL_CONTACT, DELETE_CONTACT_BY_ID, GET_USER_BY_ID, PUT_USER} from "./types"

const initialState = {
    properties: [],
    propertiesCopy: [],
    location: [],
    amenities: [],
    users: [],
    detail: {},
    contact:[],
    countries: [],
    cities: [],
    myProperties:[],
    userById: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        
        // case GET_ALL_PROPERTIES:
        //     return {...state, properties: action.payload}
        case GET_USER_BY_ID: 
            return {...state, userById: action.payload}
        case GET_ALL_ALL_PROPERTIES:
            return {...state, propertiesCopy: action.payload , properties: action.payload}
            
        case GET_ALL_CONTACT:
            return {...state, contact: action.payload}

        case GET_ALL_USERS:
            return {...state, users: action.payload}
        
        case DELETE_USER_BY_ID:
            return {...state, users: action.payload}
            
        case DELETE_CONTACT_BY_ID:
            return{...state, contact: action.payload}
        
        
        case SEARCH_BY_LOCATION:
            return {...state, properties: action.payload}

        case GET_ASSET_BY_ID:
            return {...state, detail: action.payload}

        case GET_LOCATIONS:
            console.log(action.payload)
            return {...state, location: action.payload}
        case PUT_PROPERTY:
            return {...state, properties: action.payload}
        case PUT_USER: 
            return {...state, users: action.payload}
        case SEARCH_BY_FILTER:
            return {...state, properties:action.payload}
        case GET_COUNTRIES:
            return {...state, countries:action.payload}
        case GET_STATES:
            return {...state, states: action.payload}
        case GET_AMENITIES:
            return {...state, amenities: action.payload}
        case GET_PROPERTIES_BY_USER:
            return {...state, myProperties: action.payload}
        case DELETE_LOGIC_ASSET_BY_ID:
            return{...state, myProperties : action.payload}
        case DELETE_LOGIC_USER_BY_ID:
            return{...state, users :action.payload}
    
        

            default:
            return state
    }
}

export default rootReducer