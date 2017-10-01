import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class UserLogin extends React.Component {
  constructor () {
    console.log('HERE')
    console.log('CURRENT USER: ', firebase.auth().currentUser)
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <div className="bg-login">
        <div className="box-login">
          <p className="login-title">Login</p>
        <form onSubmit={this.handleSubmit}>
          <div className="login-form">
          <div className="login-email">
            <label className="login-label-email" htmlFor='email'><small>Email</small></label>
            <input className="email login-input" type='text' onChange={(e) => this.setState({email: e.target.value})}/>
          </div>
          <div>
            <div className="login-password">
              <label className="login-label-password" htmlFor='password'><small>Password</small></label>
              <input className="password login-input" type='password' onChange={(e) => this.setState({password: e.target.value})}/>
            </div>
            <button className="login-submit-button" type='submit'>Submit</button>
            </div>
          </div>
        </form>
        </div>
      </div>

    )
  }

  handleSubmit (e) {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
      console.log(error.code)
      console.log(error.message)
    }).then(() => this.props.history.push('/itineraries'))
    
  }

  
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(UserLogin))
