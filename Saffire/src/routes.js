import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch} from 'react-router-dom'
import history from './history'
import { Main, UserLogin, UserSignup, AllItineraries, IdeaBoard, UserHome, FindFriends, SingleItinerary, FriendRequests} from './components'


/**
 * COMPONENT
 */
export default class Routes extends Component {
  render () {

    return (
      <Router history={history}>

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={UserLogin} />
          <Route path="/signup" component={UserSignup} />
          <Route path="/itineraries" component={AllItineraries}/>
          <Route path="/money" component={IdeaBoard} />
          <Route path="/mypassport" component={UserHome} />
          <Route path="/find" component={FindFriends} />
          <Route path="/itinerary/:id" component={SingleItinerary} />
          <Route path="/requests" component={FriendRequests} />
        </Switch>
      
      </Router>
    )
  }
}


