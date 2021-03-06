import React from 'react'
import {connect} from 'react-redux'
import BurgerMenu from './Menu'
import firebase from 'firebase'
import history from '../history'
import AllItineraries from './AllItineraries'

/**
 * COMPONENT
 */

function signout() {
  firebase.auth().signOut()
  .then(history.push('/'))
  .catch(err => console.log(err))
}



const UserHome = (props) => {
  const {user} = props


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



    let itinsOwned = itinArray.filter(itin => {
      // for(let key in itin.members){
        // console.log('USER EMAIL: ', user.email, " OWNER: ", itin.owner)
        return  user.email === itin.owner 
      // }
    })

    let itinsBelongTo = itinArray.filter(itin => {
      for (let key in itin.members) {
        if (itin.members[key] === user.key) {return true}
      }
      return false
    })
    let itins = itinsOwned.concat(itinsBelongTo)

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
      <p id="dash-myItinerary-header">My Itineraries</p>
      <ul>
        {Array.isArray(itins) && itins.map(itin => {
          return (
            <div key={itin.key}>
              <p></p>
            <li
            data-name={itin.name}
            >{itin.name}
            </li>
            {itin.members && 
            <div key={itin.key}>
              <p>My Buddies on this trip:</p>
              <ul>
              {Object.keys(itin.members).map(objItin => {
                return (
                  <li key={itin.members[objItin].key}>{itin.members[objItin].key}</li>                 
                )
              })}
              </ul>
            </div>
            }
            </div>
          )
        })}
      </ul>
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



