import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch} from 'react-router-dom'
import history from './history'
import { Main, UserLogin, UserSignup, AllItineraries, IdeaBoard } from './components'


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
          <Route path="/itineraries" component={AllItineraries} />
          <Route path="/money" component={IdeaBoard} />
        </Switch>
      
      </Router>
    )
  }
}


