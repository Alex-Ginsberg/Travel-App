import React from 'react'
import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'
import firebase from '../firebase'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class UserSignup extends React.Component {
  constructor () {
    console.log('HERE')
    super()
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='name'><small>Name</small></label>
            <input name='name' type='text' onChange={(e) => { this.setState({name: e.target.value}) }}/>
          </div>
          <div>
            <label htmlFor='email'><small>Email</small></label>
            <input name='email' type='text' onChange={(e) => this.setState({email: e.target.value})}/>
          </div>
          <div>
            <div>
              <label htmlFor='password'><small>Password</small></label>
              <input name='password' type='password' onChange={(e) => this.setState({password: e.target.value})}/>
            </div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    )
  }

  handleSubmit (e) {
    // Firebase signup
    e.preventDefault()
    console.log('EMAIL: ', this.state.email)
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
      console.log(error.code)
      console.log(error.message)
    })
    var userRef = firebase.database().ref('users')
    userRef.push({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    console.log(firebase.auth().currentUser)
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(UserSignup))
