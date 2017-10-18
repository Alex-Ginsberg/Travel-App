import firebase from '../firebase'
import axios from 'axios'

/*
    ACTION TYPES
*/

export const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'
export const ADD_EVENT = 'ADD_EVENT'
export const REFRESH = 'REFRESH'

/*
    THUNK MIDDLEWARE
*/
export const fetchEvents = (itineraryKey, fromLike) => dispatch => {
    const itinKey = itineraryKey;
    const itinerariesRef = firebase.database().ref(`/itineraries/${itinKey}`)
                                                                                            // Gets a reference to the particular itinerary we are getting the events from
    itinerariesRef.once('value')                                                            // 'once' is used to read data from the reference             
        .then(snapshot => {
            const events = snapshot.val().events                                          // Get the events object from the reference
            let eventsArr = []
            for (let key in events) {                                                       // Loop adds an object to state array
                const toAdd = {
                    key: key,
                    added: events[key].added,
                    description: events[key].description,
                    image: events[key].image,
                    title: events[key].title,
                    url: events[key].url,
                    likes: events[key].likes,
                    likedBy: events[key].likedBy,
                    location: events[key].location,
                    comments: events[key].comments,
                    placeID: events[key].placeID
                }
                eventsArr.push(toAdd)
            }
            return dispatch(setEvents(eventsArr))
        })
        .catch(err => console.log(err))
}

export const addEvent = (url, itinID) => dispatch => {
    axios.get(`https://api.linkpreview.net/?key=59ceb254e639805e71e929ab347575465baaf5072e1b1&q=${url}`)
        .then(res => res.data)
        .then(preview => {
            const currentItinRef = firebase.database().ref().child('itineraries').child(itinID).child('events')
            const newRef = currentItinRef.push({title: preview.title,
                description: preview.description,
                image: preview.image,
                url: preview.url,
                added: false,
                likes: 0,
                location: {
                    lat: 0,
                    lng: 0
                }
            })
            const newId = newRef.key
            const eventNode = {
                title: preview.title,
                description: preview.description,
                image: preview.image,
                url: preview.url,
                added: false, 
                key: newId,
                likes: 0,
                location: {
                    lat: 0,
                    lng: 0
                }
            }
        
            return dispatch(newEvent(eventNode))
        }).catch(err => console.log(err))
}

export const googlePlace = (suggest, itinID) => dispatch => {
    const currentItinRef = firebase.database().ref().child('itineraries').child(itinID).child('events')
            const newRef = currentItinRef.push({
                title: suggest.label,
                description: suggest.description,
                added: false,
                likes: 0,
                location: suggest.location,
                address: suggest.gmaps.formatted_address,
                placeID: suggest.placeId,
                })

            const newId = newRef.key

          
        const eventNode = {
            title: suggest.label,
            description: suggest.description,
            location: suggest.location,
            added: false, 
            key: newId,
            likes: 0,
            types: suggest.types,
            address: suggest.gmaps.formatted_address,
            placeID: suggest.placeId,
        }

        return dispatch(newEvent(eventNode))
}

export const newLike = (eventId, itinKey) => dispatch => {
    const likedByRef = firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventId).child('likedBy')
    const likesRef = firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventId).child('likes')
    
    likesRef.transaction(likes => {                                                         // Updates the like counter in firebase
        return likes + 1
    })
    likedByRef.push({name: firebase.auth().currentUser.email})
    return dispatch(fetchEvents(itinKey, true))
}
                                                                                            // Used for moving an item from 'vote' to 'added
export const confirmEvent = (eventId, itinKey) => dispatch => {
    const addedRef = firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventId).child('added')
    addedRef.transaction(added => {                                                         // Updates its 'added' field to be true
        return true
    })
    return dispatch(fetchEvents(itinKey, true))
}

export const removeSchedule = (itin, event) => dispatch => {
    const itinRef = firebase.database().ref().child('itineraries').child(itin)
    itinRef.once('value')
        .then(snapshot => {
            const itinerary = snapshot.val()
            for (let key in itinerary.events) {
                if (itinerary.events[key].title === event.title){return key}
            }
        })
        .then(eventKey => {
            itinRef.child('events').child(eventKey).child('schedule').remove()
        })
}

export const setDateAndTime = (itinId, event, date, time, toSchedule) => dispatch => {
    const eventRef = firebase.database().ref().child('itineraries').child(itinId).child('events')
    let dateToAdd = date + ''
    dateToAdd = dateToAdd.substr(0, dateToAdd.indexOf('2017'))
    let timeToAdd = time + ''
    timeToAdd = timeToAdd.substr(timeToAdd.indexOf(":") - 2, timeToAdd.length)
    eventRef.once('value')
        .then(snapshot => {
            const events = snapshot.val()
            for (let key in events) {
                if (events[key].title === event.title){
                    return key
                }

            }
        })
        .then(theKey => {
            firebase.database().ref().child('itineraries').child(itinId).child('events').child(theKey).child('schedule').update({date: dateToAdd, time: timeToAdd, toSchedule: toSchedule})
        })
        .then(() => {
            dispatch(causeRefresh('setDateAndTime'))
        })
}

/*
    ACTION CREATORS
*/
export const setEvents = events => ({type: GET_CURRENT_EVENTS, events})
export const newEvent = event => ({type: ADD_EVENT, event})
export const causeRefresh = message => ({type: REFRESH, message})