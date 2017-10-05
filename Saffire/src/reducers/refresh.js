import { REFRESH } from '../actions';

const initialState =  ''



export default function(state = initialState, action) {
    switch (action.type) {
        case REFRESH: 
            return action.message;
        default:
            return state;
    }
}