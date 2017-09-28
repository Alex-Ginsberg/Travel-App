import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch} from 'react-router-dom'
import history from './history'

import {me} from './store'
import { Main, UserLogin, UserSignup } from './components'


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
        </Switch>
      
      </Router>
    )
  }
}


