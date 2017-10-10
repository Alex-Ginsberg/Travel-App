import {SET_CURRENT_USER, UPDATE_USER} from '../actions';

const initialState =  {}



export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER: 
            window.localStorage.currentUser = JSON.stringify(action.user)
            return action.user;
        case UPDATE_USER:
            return action.newUpdatedUser;
        default:
            return state;
    }
}