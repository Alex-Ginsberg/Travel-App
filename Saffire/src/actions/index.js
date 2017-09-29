//actions
import firebase from '../firebase'

export const SET_ITINERARY = 'SET_ITINERARY'



export const postItinerary = itinerary => dispatch => {
        const itinerariesRef = firebase.database().ref('itineraries')
        console.log('INSIDE THuNK, CURRENT USER: ', firebase.auth().currentUser.email)
        const itinObj = {
            name: itinerary,
            owner: firebase.auth().currentUser.email
        }
        itinerariesRef.push(itinObj)
        console.log('SETITIN: ', setItinerary(itinObj))
        return dispatch(setItinerary(itinObj))
    }

//action creator

export const setItinerary = itineraryName => ({type: SET_ITINERARY, itineraryName});



