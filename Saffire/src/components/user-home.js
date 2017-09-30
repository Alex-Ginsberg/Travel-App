import React from 'react'
import {connect} from 'react-redux'
import BurgerMenu from './Menu'
import firebase from 'firebase';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  console.log('currentuser firebase', firebase.auth().currentUser)
  console.log('firebase', firebase.auth())

  return (

    <div>
      <div id="burgerMenu">
        <BurgerMenu />
      </div>
      <h3>Welcome, {email}</h3>
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


