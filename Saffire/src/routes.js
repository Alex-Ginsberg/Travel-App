import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch} from 'react-router-dom'
import history from './history'
import {connect} from 'react-redux'
import {fetchUsers} from './actions'
import firebase from './firebase'
import { Main, UserLogin, UserSignup, AllItineraries, IdeaBoard, UserHome, FindFriends, SingleItinerary, FriendRequests, StatusUpdate, MyFriends} from './components'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()

    /*
      LOADING ALL ITINERARIES ONTO LOCAL STORAGE SO THE USER CAN ACCESS THEM OFFLINE
    */
    const ref = firebase.database().ref()
    let itinArray = []
    ref.on('value', snapshot => {
      let allItins = snapshot.val().itineraries
      for (var key in allItins) {
        let toAdd = allItins[key]
        toAdd.key = key
        itinArray.push(toAdd)      
      }
      // Calling JSON.stringify before storing the array because local storage does not support arrays
      // If you need to access it, user JSON.parse(localStorage.allItineraries) 
      window.localStorage.allItineraries = JSON.stringify(itinArray)                                
    })
  }
  render () {
    console.log('LOCAL STORAGE: ', window.localStorage)
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={UserLogin} />
          <Route path="/signup" component={UserSignup} />
          <Route path="/itineraries" component={AllItineraries}/>
          <Route path="/ideaboard/:id" component={IdeaBoard} />
          <Route path="/mypassport" component={UserHome} />
          <Route path="/find" component={FindFriends} />
          <Route path="/itinerary/:id" component={SingleItinerary} />
          <Route path="/requests" component={FriendRequests} />
          <Route path="/update" component={StatusUpdate} />
          <Route path = "/myfriends" component = {MyFriends} />
        </Switch>    
      </Router>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData () {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)
