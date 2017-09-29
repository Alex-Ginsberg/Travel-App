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
       <div className = "sapphire-auth-div">
        <Link to='/login' className = "sapphire-app-login">Login</Link>
        <Link to='/signup' className = "sapphire-app-login">Sign Up</Link>
      </div>
      <div className="border">
        <div className = "appp">
          <h1 className="app-title">Sapphire</h1>
          <WhereTo />
        </div>
      </div>
    </div>
  )
}


