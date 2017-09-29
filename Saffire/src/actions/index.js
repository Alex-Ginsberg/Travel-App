//actions
import firebase from '../firebase'

export const SET_ITINERARY = 'SET_ITINERARY'
export const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'
export const SELECT_ITINERARY = 'SELECT_ITINERARY'



export const postItinerary = itinerary => dispatch => {
        const itinerariesRef = firebase.database().ref('itineraries')
        console.log('INSIDE THuNK, CURRENT USER: ', firebase.auth().currentUser.email)
        const newRef = itinerariesRef.push({
            name: itinerary,
            owner: firebase.auth().currentUser.email
        })
        var newId = newRef.key;
        const itinObj = {
            key: newId,
            name: itinerary,
            owner: firebase.auth().currentUser.email
        }
        console.log('NEW ID: ', newId)
        console.log('SETITIN: ', setItinerary(itinObj))
        return dispatch(setItinerary(itinObj))
}

export const fetchEvents = itinerary => dispatch => {
    const itinerariesRef = firebase.database().ref(`/itineraries/${itinerary}`)
    itinerariesRef.once('value')
        .then(snapshot => {
            const itin = snapshot.val()
            console.log('ITIN: ', itin)
            return dispatch(setEvents(itinerary))
        })
}

export const setCurrentItinerary = (itinerary, itin) => dispatch => {
    console.log('INSIDE CURRENT: ', itinerary, itin)
    const newRef = {
        name: itinerary.name,
        owner: itinerary.owner,
        key: itin
    }
    return dispatch(setItinerary(newRef))
}

//action creator

export const setItinerary = itineraryName => ({type: SET_ITINERARY, itineraryName});
export const setEvents = events => ({type: GET_CURRENT_EVENTS, events})
// export const selectItinerary = itinerary => ({type: SELECT_ITINERARY, itinerary})



