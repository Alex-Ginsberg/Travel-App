//actions
import firebase from '../firebase'
import axios from 'axios'

export const SET_ITINERARY = 'SET_ITINERARY'
export const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'
export const SELECT_ITINERARY = 'SELECT_ITINERARY'
export const ADD_EVENT = 'ADD_EVENT'
export const LIKE = 'LIKE'



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

export const fetchEvents = (itinerary, fromLike) => dispatch => {
    let itinKey
    if (fromLike) {itinKey = itinerary}
    else {itinKey = itinerary.key}
    console.log('INSIDE FETH: ', itinKey)
    const itinerariesRef = firebase.database().ref(`/itineraries/${itinKey}`)
    itinerariesRef.once('value')
        .then(snapshot => {
            const events = snapshot.val().events
            console.log('ITIN: ', events)
            let eventsArr = []
            for (var key in events) {
                console.log('IN LOOP: ', key, events[key])
                const toAdd = {
                    key: key,
                    added: events[key].added,
                    description: events[key].description,
                    image: events[key].image,
                    title: events[key].title,
                    url: events[key].url,
                    likes: events[key].likes,
                    likedBy: events[key].likedBy
                }
                eventsArr.push(toAdd)
            }
            return dispatch(setEvents(eventsArr))
        })
}

export const addEvent = (url, itin) => dispatch => {
    axios.get(`http://api.linkpreview.net/?key=59ceb254e639805e71e929ab347575465baaf5072e1b1&q=${url}`)
        .then(res => res.data)
        .then(preview => {
            let isFirstEvent = false
            const itinKey = itin.key
            let newId
            const currentItinRef = firebase.database().ref().child('itineraries').child(itin.key).child('events')
            console.log(currentItinRef)
            currentItinRef.transaction(currentEvents => {
                if (currentEvents === null){
                    isFirstEvent = true
                    return {event1: {
                        title: preview.title,
                        description: preview.description,
                        image: preview.image,
                        url: preview.url,
                        added: false,
                        likes: 0,
                        key: 'event1'
                    }}
                }
            })
            if (!isFirstEvent) {
                const newRef = currentItinRef.push({
                    title: preview.title,
                    description: preview.description,
                    image: preview.image,
                    url: preview.url,
                    added: false,
                    likes: 0
                })
                newId = newRef.key
                console.log('NEWID: ', newId)
            }
            const eventNode = {
                title: preview.title,
                description: preview.description,
                image: preview.image,
                url: preview.url,
                added: false, 
                key: newId,
                likes: 0
            }
            return dispatch(newEvent(eventNode))
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

export const newLike = (eventId, itinKey) => dispatch => {
    console.log('INSIDE LIKE: ', eventId, itinKey)
    const likedByRef = firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventId).child('likedBy')
    const likesRef = firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventId).child('likes')
    likesRef.transaction(likes => {
        return likes + 1
    })
    let isFirstLike = false
    likedByRef.transaction(likedBy => {
        if(likedBy === null) {
            isFirstLike = true
            return {firstLiker : {
                name: firebase.auth().currentUser.email
            }}
    }})
    if (!isFirstLike) {
        likedByRef.push({name: firebase.auth().currentUser.email})
    }
    return dispatch(fetchEvents(itinKey, true))
}

//action creator

export const setItinerary = itineraryName => ({type: SET_ITINERARY, itineraryName});
export const setEvents = events => ({type: GET_CURRENT_EVENTS, events})
export const newEvent = event => ({type: ADD_EVENT, event})
// export const selectItinerary = itinerary => ({type: SELECT_ITINERARY, itinerary})



