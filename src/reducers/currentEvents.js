import { GET_CURRENT_EVENTS, ADD_EVENT } from '../actions';

const initialState =  []



export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_EVENTS: 
            return action.events;
        case ADD_EVENT:
            return [...state, action.event]  
        default:
            return state;
    }
}