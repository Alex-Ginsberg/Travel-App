import firebase from '../firebase'
import axios from 'axios'
import history from '../history';

/*
    ACTION TYPES
*/
export const SET_ITINERARY = 'SET_ITINERARY'
export const GET_ITINERARY_MEMBERS = 'GET_ITINERARY_MEMBERS'

/*
    THUNK MIDDLEWARE
*/
// Adds a new itinerary to the database
export const postItinerary = (itinerary, itineraryImageURL) => dispatch => {
    const itinerariesRef = firebase.database().ref('itineraries')                       // Gets a reference to the 'itineraries' table in firebase
    const newRef = itinerariesRef.push({                                                // Pushes the new itinerary to firebase
        name: itinerary,
        owner: firebase.auth().currentUser.email,
        imageURL: itineraryImageURL,
        coordinates: {defaultCoor: {lat: 0, long: 0}},
        placeCoor: {defaultCoor: {lat: 0, long: 0}},
    })
    const newId = newRef.key;                                                           // Gets the PK from the newly created instance
                                                                                        // Creates a new object that resembles the one added to the database
                                                                                        // The only difference is that this object has the PK has a value; used in other functionality
    const itinObj = {
        key: newId,
        name: itinerary,
        owner: firebase.auth().currentUser.email
    }
    dispatch(setItinerary(itinObj))
    history.push(`/ideaboard/${newId}`);   
}

// Used to set the current itinerary state
export const setCurrentItinerary = (itinerary, itin) => dispatch => {
    const newRef = {
        name: itinerary.name,
        owner: itinerary.owner,
        key: itin,
        imageURL: itinerary.imageURL,
    }
    return dispatch(setItinerary(newRef))
}

// Gets all members of a particular itinerary
export const getItineraryMembers = itinKey => dispatch => {
    const itinRef = firebase.database().ref().child('itineraries').child(itinKey).child('members')
    itinRef.once('value')
        .then(snapshot => snapshot.val())
        .then(members => {
            const membersArray = []
            if (members) {
                Object.keys(members).forEach(key => {
                    firebase.database().ref().child('users').child(members[key].key).once('value')
                        .then(snapshot => membersArray.push(snapshot.val()))
                })
                return membersArray
            }
            else { 
                return []
            }
        })
        .then(membersArray => dispatch(setItinerayMembers(membersArray)))
        .catch(err => console.log(err))
}

export const sendComment = (itinKey, eventKey, currentUser, body) => dispatch => {
    firebase.database().ref().child('itineraries').child(itinKey).child('events').child(eventKey).child('comments').push({
        sender: currentUser.name,
        body: body
    })
}

export const addToItinerary = (itinID, user) => dispatch => {
    
    
        const itinRef = firebase.database().ref().child('itineraries').child(itinID).child('members')
        const recipient = firebase.database().ref().child('users').child(user)
    
        //push notifications for add friend to itinerary
        recipient.once('value')
        .then(snapshot => {
            return snapshot.val().localToken
        })
        .then(userToken => {
            axios({ url: 'https://fcm.googleapis.com/fcm/send',
                    method: 'post',
                    headers: {
                        'Authorization': 'key=AAAA9J-m9SY:APA91bHXe_r13MYn-BY6iWZwXQ6tOmUZZv9UeMC7LfQdgGbxXKhbnoBWNQifh-2E-t9gVGFfaiKR_ivv1OtuBufWboAhJ5SeWNdrkWiQg6WNHY5b2DXSM4Sp4_rZO60y4Nq6BNjYUsk8',
                        'Content-Type': 'application/json',
                    },
                    data: {
                            "notification": {
                            "title": "Saffire",
                            "body": "You've been added to a new itinerary! Click to view.",
                            "icon": "firebase-logo.png",
                            "click_action": "https://deets-76612.firebaseapp.com/"
                            },
                            "to": userToken
                        }
            })
            .then(response => console.log('post sent', response.data))
        })
        .catch(err => console.log(err))
    
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

export const setItinerary = itineraryName => ({type: SET_ITINERARY, itineraryName});
export const setItinerayMembers = members => ({type: GET_ITINERARY_MEMBERS, members})

