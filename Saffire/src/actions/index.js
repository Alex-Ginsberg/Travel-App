//actions
import firebase from '../firebase'
import axios from 'axios'
import {googServerKey, mapboxKey, googlePlacesKey} from '../secrets.js'
import history from '../history';
import googleMaps, {google} from '@google/maps'
import jsonp from 'jsonp';
import Geofire from 'geofire';
import secondsConverter from 'seconds-converter'

export {GET_CURRENT_EVENTS, ADD_EVENT, REFRESH,
        fetchEvents, addEvent, googlePlace,
        newLike, confirmEvent, removeSchedule,
        setDateAndTime, setEvents, newEvent,
        causeRefresh}
        from './eventActions'

export {SET_ITINERARY, GET_ITINERARY_MEMBERS, postItinerary,
        setCurrentItinerary, getItineraryMembers, sendComment,
        addToItinerary, setItinerary, setItinerayMembers}
        from './itineraryActions'

export {FETCH_USER_COOR, FETCH_COOR_TIME, SET_USER_COOR,
        SET_COOR_TIME, PLACE_DETAILS, FETCH_LOCATION_NAMES,
        FETCH_PLACES_COOR, FETCH_COOR_DISTANCE, SET_PLACES_COOR,
        SET_COOR_DISTANCE, fetchDistanceMatrix, getUserCoordinates, 
        fetchTimeMatrix, googlePlacesDetails, getLocationNames, 
        postUserCoordinates, postGeoLocation, fetchUserCoor, 
        fetchCoorTime, setUserCoor, googlePlaceDetails,
        fetchLocationNames}
        from './locationActions.js'

export {SET_USERS, SET_CURRENT_USER, SEARCH_USER,
        UPDATE_USER, fetchUsers, getCurrentUser,
        onUserListener, sendFriendRequest, addFriend,
        searchForUser, updateStatus, sendMessage,
        addToNotifications, updateUser, removeNotification,
        setUsers, setCurrentUser, searchedUser, 
        updatedUser}
        from './userActions'

const googleMapsClient = googleMaps.createClient({
    key: googServerKey,
    Promise: Promise
})

export const CONNECT = 'CONNECT'
export const connectionChange = status => ({type: CONNECT, status})
