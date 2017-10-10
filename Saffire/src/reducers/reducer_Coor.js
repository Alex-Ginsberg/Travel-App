import { FETCH_USER_COOR, FETCH_COOR_DISTANCE, FETCH_PLACES_COOR, FETCH_COOR_TIME, SET_USER_COOR, SET_PLACES_COOR, SET_COOR_DISTANCE, SET_COOR_TIME } from '../actions';

const initialState =  {
    userCoor: [],
    placesCoor:[],
    coorDistance: [],
    coorTime: [],
}



export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_COOR: 
            return Object.assign({}, state, {userCoor: action.coor})
        case FETCH_PLACES_COOR:
            return Object.assign({}, state, {placesCoor: action.coors})
        case FETCH_COOR_TIME:
            return Object.assign({}, state, {coorTime: action.times})
        case FETCH_COOR_DISTANCE:
            return Object.assign({}, state, {coorDistance: action.distances})
        case SET_USER_COOR:
        return Object.assign({}, state, {userCoor: action.coor})
        case SET_PLACES_COOR:
        return Object.assign({}, state, {placesCoor: [...state.placesCoor, action.coors]})
        case SET_COOR_DISTANCE:
        return Object.assign({}, state, {coorDistance: [...state.coorDistance, ...action.distances]})
        case SET_COOR_TIME:
        return Object.assign({}, state, {coorTime: action.coorTime})
        default:
            return state;
    }
}