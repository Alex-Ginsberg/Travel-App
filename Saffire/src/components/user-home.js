import React from 'react'
import {connect} from 'react-redux'
import BurgerMenu from './Menu'
import firebase from 'firebase';
import history from '../history';
import AllItineraries from './AllItineraries';

/**
 * COMPONENT
 */
function signout() {
  firebase.auth().signOut()
  .then(history.push('/'))
  .catch(err => console.log(err))
}



export const UserHome = (props) => {
  console.log('user home', props.currentUser);
  



  return (

    <div>
      <div id="burgerMenu">
        <BurgerMenu />
      </div>
      <div className="dash-div-image">
      <div id="dash-title-border">
      </div>
      <p id="dash-title">{props.currentUser.name}'s Passport</p>
      <a id="dash-logout" href="" onClick={signout} style={{color: 'white'}}>Logout</a>
      </div>
      
      <div className="dash-itinerary">
      <div id="dash-header-line">
      </div>
      <p id="dash-myItinerary-header">My Itinerary</p>
      <AllItineraries />
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
    currentUser: state.currentUser
  }
}

export default connect(mapState)(UserHome)


