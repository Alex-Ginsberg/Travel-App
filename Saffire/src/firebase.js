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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch(onUserListener(user))
    } else {
      // store.dispatch(setCurrentUser({}))
    }
  });

  


export default firebase
