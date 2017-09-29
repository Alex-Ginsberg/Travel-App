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
  // if(firebase.auth().currentUser === null) {
  // } else {
  //   console.log('main email', firebase.auth().currentUser.email)
  // }
  return (
    <div className="sapphire-app">
      <h1 className="app-title">Sapphire</h1>
      <WhereTo />
      <div className = "sapphire-auth-div">
        <Link to='/login' className = "sapphire-app-login">Login</Link>
        <Link to='/signup' className = "sapphire-app-login">Sign Up</Link>
        <button onClick={() => (firebase.auth().signOut()).catch(err => console.log(err))}>Logout</button>
        
      </div>


      {/* <div>
        <button onClick={() => (console.log('checked', firebase.auth().currentUser))}> check </button>
        </div> */}
    </div>
  )
}


