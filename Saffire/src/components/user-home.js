import React, {Component} from 'react'
import {connect} from 'react-redux'
import BurgerMenu from './Menu'
import firebase from 'firebase';
//import {fetchUsers} from '../actions/index.js'

/**
 * COMPONENT
 */


export const UserHome = (props) => {
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

    console.log('user', user)
    console.log('userslist', users)

    //get all itineraries owned by the user

    // let ownerItins = itinArray.filter(itin=> {
    //         return user.email === itin.owner
    //       })
      
    //console.log('ownerItin', ownerItins)

  //get itineraries associated with user

    let itins = itinArray.filter(itin => {
      
      for(let key in itin.members){
        return  user.email === itin.owner || itin.members[key] === user.key
      }
    })

    console.log('otherItin', itins)

  //go through each itin and find members === itin.members

  // let membersArr = ownerItins.map(itin => {
  //   return itin.members
  // })

  // console.log('memArr', membersArr)
    
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
      <p id="dash-myItinerary-header">My Itineraries</p>
      <ul>
        {itins.map(itin => {
          return (
            <div key={itin.key}>
              <p></p>
            <li
            data-name={itin.name}
            >{itin.name}
            </li>
            
            <p>My Buddies on this trip:</p>
            <ul>
            {Object.keys(itin.members).map(objItin => {
              return (
                <li key={objItin}>{itin.members[objItin]}</li>
                
              )
            })}
            </ul>
            </div>
          )
        })}
      </ul>
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

const mapDispatch = (dispatch, ownProps) => {
  return ({
    getGroup (e) {
      console.log('e', e.target)
      return e.target.dataset.name;
      
    }
  })
}





export default connect(mapState, mapDispatch)(UserHome)


//SMART COMPONENT



