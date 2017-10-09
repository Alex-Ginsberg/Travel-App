import { SEARCH_USER } from '../actions'

const initialState = {
    searchUser: '',
}


export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER: {
            return action.user;
        }

        default:
            return state;
    }
}