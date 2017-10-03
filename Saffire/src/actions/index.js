//actions
import firebase from '../firebase'
import axios from 'axios'

export const SET_ITINERARY = 'SET_ITINERARY'
export const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'
export const SELECT_ITINERARY = 'SELECT_ITINERARY'
export const ADD_EVENT = 'ADD_EVENT'
export const SET_USERS = 'SET_USERS'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'


                                                                                            // Used for adding a new itinerary to the database
export const postItinerary = itinerary => dispatch => {
        const itinerariesRef = firebase.database().ref('itineraries')                       // Gets a reference to the 'itineraries' table in firebase
        console.log('INSIDE THuNK, CURRENT USER: ', firebase.auth().currentUser.email)
        const newRef = itinerariesRef.push({                                                // Pushes the new itinerary to firebase
            name: itinerary,
            owner: firebase.auth().currentUser.email
        })
        var newId = newRef.key;                                                             // Gets the PK from the newly created instance
                                                                                            // Creates a new object that resembles the one added to the database
                                                                                            // The only difference is that this object has the PK has a value; used in other functionality
        const itinObj = {
            key: newId,
            name: itinerary,
            owner: firebase.auth().currentUser.email
        }
        console.log('NEW ID: ', newId)
        console.log('SETITIN: ', setItinerary(itinObj))
        return dispatch(setItinerary(itinObj))
}
                                                                                            // Used for getting all events for a certain itinerary from the database
export const fetchEvents = (itinerary, fromLike) => dispatch => {
    let itinKey
    if (fromLike) {itinKey = itinerary}                                                     // If we are fetching events because there has been a new like, itinerary passed in will already be the key
    else {itinKey = itinerary.key}
    console.log('INSIDE FETH: ', itinKey)
    const itinerariesRef = firebase.database().ref(`/itineraries/${itinKey}`)               // Gets a reference to the particular itinerary we are getting the events from
    itinerariesRef.once('value')                                                            // 'once' is used to read data from the reference             
        .then(snapshot => {
            const events = snapshot.val().events                                            // Get the events object from the reference
            console.log('ITIN: ', events)
            let eventsArr = []
            for (var key in events) {                                                       // Loop adds an object to state array
                console.log('IN LOOP: ', key, events[key])                                  // Object is similar to event in database; difference is that it contains PK
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
                                                                                            // Used when a new event is added to the itinerary's idea board
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
                                                                                            // Used when someone likes an event
export const newLike = (eventId, itinKey) => dispatch => {
    console.log('INSIDE LIKE: ', eventId, itinKey)
    const likedByRef = firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventId).child('likedBy')
    const likesRef = firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventId).child('likes')
    likesRef.transaction(likes => {                                                         // Updates the like counter in firebase
        return likes + 1
    })
    let isFirstLike = false
    likedByRef.transaction(likedBy => {                                                     // Will add the currently logged in user to the 'likedBy' group
        if(likedBy === null) {                                                              // This makes sure each event can only be liked by each user once
            isFirstLike = true                                                              // Will also allow for seeing who is going to an event
            return {firstLiker : {
                name: firebase.auth().currentUser.email
            }}
    }})
    if (!isFirstLike) {
        likedByRef.push({name: firebase.auth().currentUser.email})
    }
    return dispatch(fetchEvents(itinKey, true))
}
                                                                                            // Used for moving an item from 'vote' to 'added
export const confirmEvent = (eventId, itinKey) => dispatch => {
    console.log('INSIDE ADD EVENT: ', eventId)
    const addedRef = firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventId).child('added')
    addedRef.transaction(added => {                                                         // Updates its 'added' field to be true
        return true
    })
    return dispatch(fetchEvents(itinKey, true))
}

export const fetchUsers = () => dispatch => {
    console.log('INSIDE FETCH USERS')
    const usersRef = firebase.database().ref().child('users')
    usersRef.once('value')
        .then(snapshot => {
            const users = snapshot.val()
            let usersArr = []
            for (var key in users) {
                const toAdd = {
                    key: key,
                    email: users[key].email,
                    name: users[key].name
                }
                usersArr.push(toAdd)
            }
            return dispatch(setUsers(usersArr))
        })
}

export const addFriend = (friend) => dispatch => {
    console.log('INSIDE ADD FRIEND: ', friend)
    const usersRef = firebase.database().ref().child('users')
    usersRef.once('value')
        .then(snapshot => {
            const users = snapshot.val()
            let loggedInUser = null
            for (var key in users) {
                if (users[key].email === firebase.auth().currentUser.email){loggedInUser = key}
            }
            console.log('LOGGED IN USER: ', loggedInUser)
            return loggedInUser
        })
        .then(loggedIn => {
            const currentUserRef = firebase.database().ref().child('users').child(loggedIn).child('friends')
            console.log(currentUserRef)
            currentUserRef.transaction(friends => {
                if (friends === null) {
                    return {firstFriend: {
                        name: friend.name,
                        email: friend.email,
                        key: friend.key
                    }}
                }
            })
                console.log('ADDING ANOTHER FRIEND')
                currentUserRef.push({
                    name: friend.name,
                    email: friend.email,
                    key: friend.key
                })

        })
        
}

export const getCurrentUser = () => dispatch => {
    console.log('IN GET: ', firebase.auth().currentUser)
    if (firebase.auth().currentUser) {
        
        const usersRef = firebase.database().ref().child('users')
        usersRef.once('value')
            .then(snapshot => {
                const users = snapshot.val()
                let loggedInUser = null
                for (var key in users) {
                    if (users[key].email === firebase.auth().currentUser.email){loggedInUser = {
                        key: key,
                        email: users[key].email,
                        friends: users[key].friends,
                        image: users[key].image,
                        name: users[key].name
                    }}
                }
                console.log('LOGGED IN USER: ', loggedInUser)
                return dispatch(setCurrentUser(loggedInUser))
            })
    }
    else {
        return dispatch(setCurrentUser({}))
    }
}

export const onUserListener = (user) => dispatch => {
    const usersRef = firebase.database().ref().child('users')
    usersRef.once('value')
    .then(snapshot => {
        const users = snapshot.val()
        const localToken = window.localStorage.getItem('localUserToken');
        let loggedInUser = null

        for (var key in users) {
            if (users[key].email === user.email){
                const usersRefChild = firebase.database().ref().child('users').child(key).child('localToken')
                usersRefChild.transaction((tokenKey) => {
                    return localToken
                })
    
                loggedInUser = {
                key: key,
                email: users[key].email,
                friends: users[key].friends,
                image: users[key].image,
                name: users[key].name
                }
            }
        }
        console.log('LOGGED IN USER: ', loggedInUser)

        return dispatch(setCurrentUser(loggedInUser))
    })
}


export const addToItinerary = (itin, user) => dispatch => {
    const itinRef = firebase.database().ref().child('itineraries').child(itin).child('members')
    let isFirst = false
    itinRef.transaction(members => {
        if (members === null){
            isFirst = true
            return {firstMember: {
                key: user
            }}
        }
    })
    if (!isFirst) {
        itinRef.push({key: user})
    }

}

//action creator

export const setItinerary = itineraryName => ({type: SET_ITINERARY, itineraryName});
export const setEvents = events => ({type: GET_CURRENT_EVENTS, events})
export const newEvent = event => ({type: ADD_EVENT, event})
export const setUsers = users => ({type: SET_USERS, users})
export const setCurrentUser = user => ({type: SET_CURRENT_USER, user})
// export const selectItinerary = itinerary => ({type: SELECT_ITINERARY, itinerary})



