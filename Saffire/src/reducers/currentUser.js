import { SET_CURRENT_USER } from '../actions';

const initialState =  {}



export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER: 
            return action.user;
        default:
            return state;
    }
}