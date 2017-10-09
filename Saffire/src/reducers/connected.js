import { CONNECT } from '../actions';

const initialState =  false



export default function(state = initialState, action) {
    switch (action.type) {
        case CONNECT: 
            console.log('connect', action.status);
            return action.status;
        default:
            return state;
    }
}