import React, {Component} from 'react'
import {connect} from 'react-redux'
import BurgerMenu from './Menu'
import firebase from 'firebase'
import history from '../history'
import AllItineraries from './AllItineraries'
import {MapComp} from '../components'
import {googServerKey} from '../secrets.js'

/**
 * COMPONENT
 */

function signout() {
  firebase.auth().signOut()
  .then(history.push('/'))
  .catch(err => console.log(err))
}


const UserHome = (props) => {
  const {email, user, users, getGroup} = props

  

  //database reference

  const ref = firebase.database().ref()
  let itinArray = []
  ref.on('value', snapshot => {
    let allItins = snapshot.val().itineraries
    
     for (var key in allItins) {
      let toAdd = allItins[key]
      toAdd.key = key
      itinArray.push(toAdd)      
    }
  })  


    //get itineraries user owns and is associated with

    let itins = itinArray.filter(itin => {
      
      for(let key in itin.members){
        return  user.email === itin.owner || itin.members[key] === user.key
      }
    })

  return (
    
    <div>
      <div id="burgerMenu">
        <BurgerMenu />
      </div>
      <div className="dash-div-image">
      <div id="dash-title-border">
      </div>
      <p id="dash-title">{user.name}'s Passport</p>
      <a id="dash-logout" href="" onClick={signout} style={{color: 'white'}}>Logout</a>
      </div>
      <div id="dash-map">
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
const mapState = state => {
  return {
  user: state.currentUser,
  users: state.users,
  }
}







export default connect(mapState)(UserHome)


//SMART COMPONENT



