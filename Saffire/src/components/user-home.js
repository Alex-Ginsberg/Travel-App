import React from 'react'
import {connect} from 'react-redux'
import BurgerMenu from './Menu'
import firebase from 'firebase';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  console.log('email', email)
  const {email} = props
  console.log('currentuser firebase', firebase.auth().currentUser)
  console.log('firebase', firebase.auth())

  return (

    <div>
      <div id="burgerMenu">
        <BurgerMenu />
      </div>
      <div className="dash-div-image">
      <div id="dash-title-border">
      </div>
      <p id="dash-title">My Passport</p>
      <p id="dash-welcome">Welcome, Stranger {email}</p>
      <p id="dash-logout">Logout</p>
      </div>
      
      <div className="dash-itinerary">
      <div id="dash-header-line">
      </div>
      <p id="dash-myItinerary-header">My Itinerary</p>
      </div>
      <div className="dash-groups">
      <p id="dash-myBuddies-header">My Buddies</p>
      </div>
    </div>
    
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)


