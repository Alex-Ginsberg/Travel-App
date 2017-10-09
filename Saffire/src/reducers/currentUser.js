import { SET_CURRENT_USER } from '../actions';

const initialState =  {}



export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER: 
            window.localStorage.currentUser = JSON.stringify(action.user)
            return action.user;
        default:
            return state;
    }
}