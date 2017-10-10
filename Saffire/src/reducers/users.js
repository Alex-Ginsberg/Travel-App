import {SET_USERS} from '../actions';

const initialState =  []



export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USERS: 
            return action.users;
        default:
            return state;
    }
}