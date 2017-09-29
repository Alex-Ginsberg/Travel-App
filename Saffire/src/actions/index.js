//actions
import firebase from '../firebase'
import axios from 'axios'

export const SET_ITINERARY = 'SET_ITINERARY'
// export const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'
export const SELECT_ITINERARY = 'SELECT_ITINERARY'
export const ADD_EVENT = 'ADD_EVENT'



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

// export const fetchEvents = itinerary => dispatch => {
//     const itinerariesRef = firebase.database().ref(`/itineraries/${itinerary}`)
//     itinerariesRef.once('value')
//         .then(snapshot => {
//             const itin = snapshot.val()
//             console.log('ITIN: ', itin)
//             return dispatch(setEvents(itinerary))
//         })
// }

export const addEvent = (url, itin) => dispatch => {
    axios.get(`http://api.linkpreview.net/?key=59ceb254e639805e71e929ab347575465baaf5072e1b1&q=${url}`)
        .then(res => res.data)
        .then(preview => {
            let isFirstEvent = false
            const itinKey = itin.key
            const eventNode = {
                title: preview.title,
                description: preview.description,
                image: preview.image,
                url: preview.url
            }
            // var amandaAgeRef = ref.child("players").child("-KGb1Ls-gEErWbAMMnZC").child('age');
            const currentItinRef = firebase.database().ref().child('itineraries').child(itin.key).child('events')
            console.log(currentItinRef)
            currentItinRef.transaction(currentEvents => {
                if (currentEvents === null){
                    isFirstEvent = true
                    return {event1: eventNode}
                }
            })
            if (!isFirstEvent) {
                currentItinRef.push(eventNode)
            }
            
            // Add event node to the current itins events
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
// export const setEvents = events => ({type: GET_CURRENT_EVENTS, events})
// export const selectItinerary = itinerary => ({type: SELECT_ITINERARY, itinerary})



