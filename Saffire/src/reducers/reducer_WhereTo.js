import { SET_ITINERARY } from '../actions';

const initialState = {
    newItinerary: ''
}


export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ITINERARY: 
            console.log('reducer', action.itineraryName);
            return action.itineraryName;
            
        default:
            return state;
    }
}