import { GET_ITINERARY_MEMBERS } from '../actions';

const initialState =  []



export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ITINERARY_MEMBERS: 
            return action.members;
        default:
            return state;
    }
}