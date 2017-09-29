import React from 'react'
import {Link} from 'react-router-dom'
import firebase from '../firebase'
import WhereTo from './WhereTo'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
export const Main = (props) => {
  console.log('main', firebase.auth().currentUser)
  return (
    <div className="sapphire-app">
      <h1 className="app-title">Sapphire</h1>
      <WhereTo />
      <div className = "sapphire-auth-div">
        <Link to='/login' className = "sapphire-app-login">Login</Link>
        <Link to='/signup' className = "sapphire-app-login">Sign Up</Link>
        <button onClick={() => firebase.auth().signOut().then(console.log(firebase.auth())).catch(err => console.log(err))}>Logout</button>
        
      </div>
    </div>
  )
}


