import * as firebase from 'firebase'
import {firebase_pw} from './secrets'
var config = {
  apiKey: firebase_pw,
  authDomain: 'deets-76612.firebaseapp.com',
  databaseURL: 'https://deets-76612.firebaseio.com',
  projectId: 'deets-76612',
  storageBucket: 'deets-76612.appspot.com',
  messagingSenderId: '1050650539302'
}
firebase.initializeApp(config)

export default firebase
