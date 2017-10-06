import * as firebase from 'firebase';
import {firebase_pw} from './secrets.js';
import {onUserListener, connectionChange} from './actions'
import store from './store'


console.log('CONECTIOM: ', connectionChange)
var config = {
    apiKey: firebase_pw,
    authDomain: 'deets-76612.firebaseapp.com',
    databaseURL: 'https://deets-76612.firebaseio.com',
    projectId: 'deets-76612',
    storageBucket: 'deets-76612.appspot.com',
    messagingSenderId: '1050650539302'
};


firebase.initializeApp(config);

/*
  Firebase Event Listenets
*/

// Checks to see when the auth state changes
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(onUserListener(user))
  } else {
    // store.dispatch(setCurrentUser({}))
  }
});

const connectedRef = firebase.database().ref(".info/connected")
connectedRef.on("value", snap => {
  if (snap.val() === true) {
    console.log('CONNECTED: ', connectionChange)
    store.dispatch(connectionChange(true))
  }
  else {
    console.log('DISCONNECTED: ', connectionChange)
    if(typeof store !== 'undefined') {store.dispatch(connectionChange(false))}
  }
})


const messaging = firebase.messaging();

messaging.requestPermission()
  .then(() => {
    console.log('have permission');
    return messaging.getToken()
  })
  .then(token => {
    console.log('token', token)
    sendTokenToServer(token)
  })
  .catch((err) => {
    console.log('no permission')
    console.log(err)
  });


messaging.onMessage(function(payload) {
  console.log('onMessage firebase.js', payload);
})



function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(currentToken);
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
        'unless it changes');
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('localUserToken') == 1;
}

function setTokenSentToServer(token) {
  window.localStorage.setItem('localUserToken', token ? token : 0);
}


  // [START refresh_token]
  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(function() {
    messaging.getToken()
    .then(function(refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // [START_EXCLUDE]
      // Display new Instance ID token and clear UI of all previous messages.
      resetUI();
      // [END_EXCLUDE]
    })
    .catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
    });
  });
  // [END refresh_token]



  function resetUI() {
  
    // [START get_token]
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken()
    .then(function(currentToken) {
      if (currentToken) {
        sendTokenToServer(currentToken);

      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        setTokenSentToServer(false);
      }
    })
    .catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
      setTokenSentToServer(false);
    });
  }
  // [END get_token]



   



export default firebase
