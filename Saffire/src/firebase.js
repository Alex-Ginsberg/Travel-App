import * as firebase from 'firebase';
import {firebase_pw} from './secrets.js';
import {onUserListener} from './actions'
import store from './store'
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

// Checks to see when a request is deleted
const databaseRef = firebase.database().ref().child('users')
databaseRef.on('value', snapshot => {
  console.log('SOMETHING CHANGED: ', snapshot.val())
})

const messaging = firebase.messaging();

messaging.requestPermission()
  .then(() => {
    console.log('have permission');
    return messaging.getToken()
  })
  .then(token => console.log('token', token))
  .catch((err) => {
    console.log('no permission')
    console.log(err)
  });



  

export default firebase
