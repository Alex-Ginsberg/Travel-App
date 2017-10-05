import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch} from 'react-router-dom'
import history from './history'
import {connect} from 'react-redux'
import {fetchUsers} from './actions'
import { Main, UserLogin, UserSignup, AllItineraries, IdeaBoard, UserHome, FindFriends, SingleItinerary, FriendRequests, StatusUpdate} from './components'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }
  render () {

    return (
      <Router history={history}>

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={UserLogin} />
          <Route path="/signup" component={UserSignup} />
          <Route path="/itineraries" component={AllItineraries}/>
          <Route path="/ideaboard" component={IdeaBoard} />
          <Route path="/mypassport" component={UserHome} />
          <Route path="/find" component={FindFriends} />
          <Route path="/itinerary/:id" component={SingleItinerary} />
          <Route path="/requests" component={FriendRequests} />
          <Route path="/update" component={StatusUpdate} />
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
