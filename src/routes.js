import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch, Redirect} from 'react-router-dom'
import history from './history'
import {connect} from 'react-redux'
import {fetchUsers} from './actions'
import firebase from './firebase'
import { Main, UserLogin, UserSignup, AllItineraries, IdeaBoard, UserHome, FindFriends, SingleItinerary, FriendRequests, StatusUpdate, MyFriends, WhereTo, UserSettings, NotFound, Loading} from './components'


/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
    }
  }
  componentDidMount () {

    this.props.loadInitialData()

    setTimeout(() => {
      this.setState({loading: false})
    }, 2000 )

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
    if(this.state.loading){
      return <Loading/>
    }

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
          <Route path = "/whereto" component = {WhereTo} />
          <Route path = "/settings" component = {UserSettings} />
          <Route path="/notfound" component = {NotFound} />
          <Redirect to= "/notfound" component={NotFound} /> 
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
