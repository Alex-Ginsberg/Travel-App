import {FETCH_LOCATION_NAMES} from '../actions';

const initialState =  {
    locationNames: [],
}



export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATION_NAMES: 
            return Object.assign({}, state, {locationNames: action.locations})
        default:
            return state;
    }
}