import { PLACE_DETAILS } from '../actions'

const initialState = {
    googlePlaceDetails: {}
}


export default function(state = initialState, action) {
    switch (action.type) {
        case PLACE_DETAILS:
            return action.details;

        default: {
            return state;
        }
    }
}