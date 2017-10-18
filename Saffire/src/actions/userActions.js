import firebase from '../firebase'
import axios from 'axios'
import {googServerKey, mapboxKey, googlePlacesKey} from '../secrets.js'
import history from '../history';
import googleMaps, {google} from '@google/maps'
import jsonp from 'jsonp';
import Geofire from 'geofire';
import secondsConverter from 'seconds-converter'

/*
    ACTION TYPES
*/
export const SET_USERS = 'SET_USERS'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SEARCH_USER = 'SEARCH_USER'
export const UPDATE_USER = 'UPDATE_USER'

/*
    THUNK MIDDLEWARE
*/
export const fetchUsers = () => dispatch => {
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
                    localToken: users[key].localToken,
                    notifications: users[key].notifications
                }
                usersArr.push(toAdd)
            }
            return dispatch(setUsers(usersArr))
        })
        .catch(err => console.log(err))
}

export const getCurrentUser = () => dispatch => {
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
                        status: users[key].status,
                        notifications: users[key].notifications
                    }}
                }

                return dispatch(setCurrentUser(loggedInUser))
            })
            .catch(err => console.log(err))
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
        let loggedInUser = {};

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
                requests: users[key].requests,
                notifications: users[key].notifications
            }}

        }

        return dispatch(setCurrentUser(loggedInUser))
    }).catch(err => console.log(err))
}


export const sendFriendRequest = (user, friend) => dispatch => {
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
    const currentUserRef = firebase.database().ref().child('users').child(user.key).child('friends')
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

export const searchForUser = (searchEmail) => dispatch => {
    const usersRef = firebase.database().ref().child('users')
    usersRef.once('value')
        .then(snapshot => {
            const users = snapshot.val()
            let foundUser = null;
            let foundUserID = '';
            for (let key in users) {
                if (users[key].email === searchEmail) {
                    foundUser = users[key];
                    foundUserID = key;
                }
            }

            if (!foundUser) {
                return;
            }

            const userCred = {
                name: foundUser.name,
                email: foundUser.email,
                key: foundUserID,
            }

            return dispatch(searchedUser(userCred))
        })
        .catch(err => console.log(err))
}

export const updateStatus = (user, status) => dispatch => {
    const statusRef = firebase.database().ref().child('users').child(user.key).child('status')
    statusRef.transaction(oldStatus => {
        return status
    })

}

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

export const addToNotifications = body => dispatch => {
    const userRef = firebase.database().ref().child('users')
    userRef.once('value')
        .then(snapshot => snapshot.val())
        .then(users => {
            for (let key in users) {
                if (users[key].email === firebase.auth().currentUser.email){return key}
            }
        })
        .then(userKey => {
            const currentUserRef = firebase.database().ref().child('users').child(userKey).child('notifications')
            currentUserRef.push({body: body, time: new Date()})
        })
}

export const updateUser = (newName, newEmail, newPassword, userID) => dispatch => {
    const authUser = firebase.auth().currentUser;
    const selectedUser = firebase.database().ref().child(`users/${userID}`);
    const newData = {
        name : newName,
        email: newEmail,
        
    }
    selectedUser.update(newData);
    return authUser.updateEmail(newEmail)
    .then( () => {
        return authUser.updatePassword(newPassword)
    })
    .then(() => {
        return dispatch(getCurrentUser())
    })
        .catch(err => console.log(err))
}

export const removeNotification = (user, body) => dispatch => {
    const requestRef = firebase.database().ref().child('users').child(user.key).child('notifications')
    requestRef.once('value')
        .then(snapshot => snapshot.val())
        .then(requests => {
            for (let key in requests) {
                if (requests[key].body === body){return key}
            }
        })
        .then(reqKey => {
            firebase.database().ref().child('users').child(user.key).child('notifications').child(reqKey).remove()
            dispatch(getCurrentUser())
        })
        .catch(err => console.log(err))
}

/*
    ACTION CREATORS
*/
export const setUsers = users => ({type: SET_USERS, users})
export const setCurrentUser = user => ({type: SET_CURRENT_USER, user})
export const searchedUser = user => ({type: SEARCH_USER, user});
export const updatedUser = newUpdatedUser => ({type: UPDATE_USER, newUpdatedUser})