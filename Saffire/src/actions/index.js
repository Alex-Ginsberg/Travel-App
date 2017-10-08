//actions
import firebase from '../firebase'
import axios from 'axios'
import {googServerKey} from '../secrets.js'
import history from '../history';


export const SET_ITINERARY = 'SET_ITINERARY'
export const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'
export const SELECT_ITINERARY = 'SELECT_ITINERARY'
export const ADD_EVENT = 'ADD_EVENT'
export const SET_USERS = 'SET_USERS'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const REFRESH = 'REFRESH'
export const CONNECT = 'CONNECT'
export const FETCH_USER_COOR = 'FETCH_USER_COOR'



                                                                                            // Used for adding a new itinerary to the database
export const postItinerary = (itinerary, itineraryImageURL) => dispatch => {
        const itinerariesRef = firebase.database().ref('itineraries')                       // Gets a reference to the 'itineraries' table in firebase
        console.log('INSIDE THuNK, CURRENT USER: ', firebase.auth().currentUser.email)
        const newRef = itinerariesRef.push({                                                // Pushes the new itinerary to firebase
            name: itinerary,
            owner: firebase.auth().currentUser.email,
            // imageURL: itineraryImageURL,
            coordinates: {defaultCoor: {lat: 0, long: 0}},
            placeCoor: {defaultCoor: {lat: 0, long: 0}},
        })
        const newId = newRef.key;                                                             // Gets the PK from the newly created instance
                                                                                            // Creates a new object that resembles the one added to the database
                                                                                            // The only difference is that this object has the PK has a value; used in other functionality
        const itinObj = {
            key: newId,
            name: itinerary,
            owner: firebase.auth().currentUser.email
        }
        console.log('NEW ID: ', newId)
        console.log('SETITIN: ', setItinerary(itinObj))
        dispatch(setItinerary(itinObj))
        history.push(`/ideaboard/${newId}`);
        
}
                                                                                            // Used for getting all events for a certain itinerary from the database
export const fetchEvents = (itineraryKey, fromLike) => dispatch => {
    const itinKey = itineraryKey;
    // if (fromLike) {itinKey = itineraryKey}                                                     // If we are fetching events because there has been a new like, itinerary passed in will already be the key
    // else {itinKey = itinerary.key}
    console.log('INSIDE FETH: ', itinKey)
    const itinerariesRef = firebase.database().ref(`/itineraries/${itinKey}`) 
                                                                                            // Gets a reference to the particular itinerary we are getting the events from
    itinerariesRef.once('value')                                                            // 'once' is used to read data from the reference             
        .then(snapshot => {
            console.log('ITIN:', snapshot.val());
            const events = snapshot.val().events                                          // Get the events object from the reference
            console.log('ITIN: ', events)
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
                    // address: events[key].gmaps.formatted_address,
                }
                eventsArr.push(toAdd)
            }
            return dispatch(setEvents(eventsArr))
        })
}
                                                                                            // Used when a new event is added to the itinerary's idea board
export const addEvent = (url, itinID) => dispatch => {
    axios.get(`https://api.linkpreview.net/?key=59ceb254e639805e71e929ab347575465baaf5072e1b1&q=${url}`)
        .then(res => res.data)
        .then(preview => {
            // let isFirstEvent = false
            // con newId
            console.log('itinID', itinID);
            const currentItinRef = firebase.database().ref().child('itineraries').child(itinID).child('events')
            // console.log('currentItinRef addevent Action', currentItinRef)
            const newRef = currentItinRef.push({title: preview.title,
                description: preview.description,
                image: preview.image,
                url: preview.url,
                added: false,
                likes: 0})
            const newId = newRef.key
            const eventNode = {
                title: preview.title,
                description: preview.description,
                image: preview.image,
                url: preview.url,
                added: false, 
                key: newId,
                likes: 0,
            }
        
            return dispatch(newEvent(eventNode))
        })
}

export const googlePlace = (suggest, itinID) => dispatch => {
    const currentItinRef = firebase.database().ref().child('itineraries').child(itinID).child('events')
            // console.log('currentItinRef addevent Action', currentItinRef)
            const newRef = currentItinRef.push({
                title: suggest.label,
                description: suggest.description,
                added: false,
                likes: 0,
                location: suggest.location,
                address: suggest.gmaps.formatted_address,
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
        }

        return dispatch(newEvent(eventNode))
} 




export const setCurrentItinerary = (itinerary, itin) => dispatch => {
    console.log('INSIDE CURRENT: ', itinerary, itin)
    const newRef = {
        name: itinerary.name,
        owner: itinerary.owner,
        key: itin,
        imageURL: itinerary.imageURL,
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
    
    // likedByRef.transaction(likedBy => {                                                     // Will add the currently logged in user to the 'likedBy' group
    //     if(likedBy === null) {                                                              // This makes sure each event can only be liked by each user once
    //         isFirstLike = true                                                              // Will also allow for seeing who is going to an event
    //         return {firstLiker : {
    //             name: firebase.auth().currentUser.email
    //         }}
    // }})

    likedByRef.push({name: firebase.auth().currentUser.email})

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
            for (let key in users) {
                const toAdd = {
                    key: key,
                    email: users[key].email,
                    name: users[key].name, 
                    image: users[key].image,
                    status: users[key].status,
                    localToken: users[key].localToken
                }
                usersArr.push(toAdd)
            }
            return dispatch(setUsers(usersArr))
        })
}

export const sendFriendRequest = (user, friend) => dispatch => {
    console.log('INSIDE SEND FRIEND REQUEST: USER: ', user, ' FRIEND: ', friend)
    const requestRef = firebase.database().ref().child('users').child(friend.key).child('requests')
    let isFirstRequest = false
    requestRef.transaction(requests => {
        if (requests === null) {
            isFirstRequest = true
            return {firstReq: {
                from: user.email,
                userKey: user.key,
                name: user.name
            }}
        }
    })
    if (!isFirstRequest) {
        requestRef.push({from: user.email, userKey: user.key, name: user.name})
    }

    const recipient = firebase.database().ref().child('users').child(friend.key);

    //push notifications for send friend request to itinerary
    recipient.once('value')
    .then(snapshot => {
        return snapshot.val().localToken
    })
    .then(userToken => {
        console.log('userToken ******', userToken);
        axios({ url: 'https://fcm.googleapis.com/fcm/send',
                method: 'post',
                headers: {
                    'Authorization': 'key=AAAA9J-m9SY:APA91bHXe_r13MYn-BY6iWZwXQ6tOmUZZv9UeMC7LfQdgGbxXKhbnoBWNQifh-2E-t9gVGFfaiKR_ivv1OtuBufWboAhJ5SeWNdrkWiQg6WNHY5b2DXSM4Sp4_rZO60y4Nq6BNjYUsk8',
                    'Content-Type': 'application/json',
                },
                data: {
                        "notification": {
                        "title": "Saffire",
                        "body": `${user.name} added you as a friend!`,
                        "icon": "firebase-logo.png",
                        "click_action": "https://deets-76612.firebaseapp.com/requests"
                        },
                        "to": userToken
                    }
        })
        .then(response => console.log('post sent', response.data))
    })
    .catch(err => console.log(err))





}

export const addFriend = (user, friend) => dispatch => {
        // console.log('INSIDE ADD FRIEND: ', friend, user, friend.reqKey)
            const currentUserRef = firebase.database().ref().child('users').child(user.key).child('friends')
            // console.log(currentUserRef)
            let isFirst = false
            currentUserRef.transaction(friends => {
                if (friends === null) {
                    isFirst = true
                    return {firstFriend: {
                        name: friend.name,
                        email: friend.email,
                        key: friend.key
                    }}
                }
            })
            if (!isFirst) {
                currentUserRef.push({
                    name: friend.name,
                    email: friend.email,
                    key: friend.key
                })
            }
            const friendRef = firebase.database().ref().child('users').child(friend.key).child('friends')
            isFirst = false
            friendRef.transaction(friends => {
                if (friends === null) {
                    isFirst = true
                    return {firstFriend: {
                        name: user.name,
                        email: user.email,
                        key: user.key
                    }}
                }
            })
            if (!isFirst) {
                friendRef.push({
                    name: user.name,
                    email: user.email,
                    key: user.key
                })
            }
        firebase.database().ref().child('users').child(user.key).child('requests').child(friend.reqKey).remove()


        const recipient = firebase.database().ref().child('users').child(friend.key);
        
            //push notifications for send friend request to itinerary
            recipient.once('value')
            .then(snapshot => {
                return snapshot.val().localToken
            })
            .then(userToken => {
                console.log('userToken ******', userToken);
                axios({ url: 'https://fcm.googleapis.com/fcm/send',
                        method: 'post',
                        headers: {
                            'Authorization': 'key=AAAA9J-m9SY:APA91bHXe_r13MYn-BY6iWZwXQ6tOmUZZv9UeMC7LfQdgGbxXKhbnoBWNQifh-2E-t9gVGFfaiKR_ivv1OtuBufWboAhJ5SeWNdrkWiQg6WNHY5b2DXSM4Sp4_rZO60y4Nq6BNjYUsk8',
                            'Content-Type': 'application/json',
                        },
                        data: {
                                "notification": {
                                "title": "Saffire",
                                "body": `${user.name} accepted you as a friend!`,
                                "icon": "firebase-logo.png",
                                "click_action": "https://deets-76612.firebaseapp.com/requests"
                                },
                                "to": userToken
                            }
                })
                .then(response => console.log('post sent', response.data))
            })
            .catch(err => console.log(err))





        return dispatch(getCurrentUser())
}

export const getCurrentUser = () => dispatch => {
    console.log('IN GET: ', firebase.auth().currentUser)
    if (firebase.auth().currentUser) {
        
        const usersRef = firebase.database().ref().child('users')
        usersRef.once('value')
            .then(snapshot => {
                const users = snapshot.val()
                let loggedInUser = null
                for (let key in users) {
                    if (users[key].email === firebase.auth().currentUser.email){loggedInUser = {
                        key: key,
                        email: users[key].email,
                        friends: users[key].friends,
                        image: users[key].image,
                        name: users[key].name,
                        requests: users[key].requests,
                        status: users[key].status
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

        for (let key in users) {
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
                status: users[key].status,
                name: users[key].name,
                requests: users[key].requests
            }}

        }
        console.log('LOGGED IN USER: ', loggedInUser)

        return dispatch(setCurrentUser(loggedInUser))
    })
}


export const addToItinerary = (itinID, user) => dispatch => {


    const itinRef = firebase.database().ref().child('itineraries').child(itinID).child('members')
    const recipient = firebase.database().ref().child('users').child(user)


    //push notifications for add friend to itinerary
    recipient.once('value')
    .then(snapshot => {
        console.log('ahhhhhhhhh token', snapshot.val().localToken);
        return snapshot.val().localToken
    })
    .then(userToken => {
        console.log('userToken ******', userToken);
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

export const updateStatus = (user, status) => dispatch => {
    const statusRef = firebase.database().ref().child('users').child(user.key).child('status')
    statusRef.transaction(oldStatus => {
        return status
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
            console.log(time, itinId, theKey)
            const evRef = firebase.database().ref().child('itineraries').child(itinId).child('events').child(theKey).child('schedule').update({date: dateToAdd, time: timeToAdd, toSchedule: toSchedule})
            console.log('updated')
        })
        .then(() => {
            dispatch(causeRefresh('setDateAndTime'))
            console.log('refresh')
        })
        
}

    

// export const geoFindMe = () => dispatch => {
    
//     console.log('handleClick thunk')

//     var output = document.getElementById("out");

//     //if no geolocation on browser
//     if (!navigator.geolocation){
//       output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
//       return;
//     }
    
//     //success function triggers when allowed
//     function success(position) {
//       let latitude  = position.coords.latitude;
//       let longitude = position.coords.longitude;
      
//       let userCoor = [];
//       userCoor.push(longitude, latitude)

//       // this.setState({
//       //   userCoordinates: userCoor,
//       //   onClickDirty: true,
//       // })

//       console.log('userCoor', userCoor)
//       return userCoor;
      
//     }
    
//     //error handler
//     function error() {
//       output.innerHTML = "Unable to retrieve your location";
//     }
  
//     output.innerHTML = "<p>Locating…</p>";

//     navigator.geolocation.getCurrentPosition(success, error);
  
// }


// *******************

export const postUserCoordinates =  itin => dispatch => {
    console.log('post coor hit')
    
    const coorRef = firebase.database().ref().child('itineraries').child(itin).child('coordinates')
    const noCoorRef = firebase.database().ref().child('itineraries').child(itin)
    noCoorRef.once('value')
    .then(result => {
        let payload = [];

        if (!navigator.geolocation){
            console.log('not supported')
            //output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
          }

        function success(position) {
            console.log('success hit')
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            payload.push(longitude, latitude)
            console.log('payload', payload)

            let fireRef = firebase.database().ref().child('itineraries').child(itin)
            fireRef.child('coordinates').push({lat: payload[0], long: payload[1]})

            }
        
          function error() {
            console.log('sorry no geolocator')
            //output.innerHTML = "Unable to retrieve your location";
          }
        
          //output.innerHTML = "<p>Locating…</p>";
          navigator.geolocation.getCurrentPosition(success, error)

         })
    .catch(err => {
        console.log(err)
    })
}


export const postGeoLocation = itin => dispatch => {
    console.log('itinpost', itin)
    const userRef = firebase.database().ref().child('itineraries').child(itin).child('coordinates')
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googServerKey}`)
    .then(result => {
        let locationArr = Object.keys(result.data.location)
        let locationObj = result.data.location
        console.log('location***', result.data.location)
        let resultArr =[]
        resultArr.push(Number(locationObj[locationArr[1]]), Number(locationObj[locationArr[0]]))
        console.log('resultArr', resultArr)
        return resultArr
    })
    .then(resultArray => {
        console.log('resultArraythen', resultArray )
        userRef.push({lat: resultArray[0], long: resultArray[1]})
    })}

export const sendMessage = (user, itinKey, message) => {
    const messageRef = firebase.database().ref().child('itineraries').child(itinKey).child('messages')
    messageRef.push({
        sender: user.name,
        content: message,
    })
    const newMessageRef = firebase.database().ref().child('itineraries').child(itinKey).child('newMessage').child('currentMessage')
    newMessageRef.transaction(newMessageRef => {
        return message

    })
}



      

//action creator

export const setItinerary = itineraryName => ({type: SET_ITINERARY, itineraryName});
export const setEvents = events => ({type: GET_CURRENT_EVENTS, events})
export const newEvent = event => ({type: ADD_EVENT, event})
export const setUsers = users => ({type: SET_USERS, users})
export const setCurrentUser = user => ({type: SET_CURRENT_USER, user})
export const causeRefresh = message => ({type: REFRESH, message})
export const connectionChange = status => ({type: CONNECT, status})
export const fetchUserCoor = coor => ({type: FETCH_USER_COOR, coor})



