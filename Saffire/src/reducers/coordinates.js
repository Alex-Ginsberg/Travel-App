import { FETCH_USER_COOR } from '../actions';

const initialState = []



export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_COOR: 
            return [...state, action.coor];
        default:
            return state;
    }
}