import React from 'react'
import {connect} from 'react-redux'
import {withRouter } from 'react-router-dom'
import BurgerMenu from './Menu';
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
      <div className = "sapphire-user-signup-div">
        <BurgerMenu />
        
        <h1>SAFFIRE</h1>
        
        <div className = "sapphire-user-signup-box">
          <form onSubmit={this.handleSubmit} className = "sapphire-user-signup-form">
            
            <h2>SIGN UP</h2>
            
            <div className = "sapphire-user-signup-input">
              <input name='name' type='text' onChange={(e) => { this.setState({name: e.target.value}) }} placeholder="name"/>
            </div>

            <div className = "sapphire-user-signup-input">
              <input name='email' type='email' onChange={(e) => this.setState({email: e.target.value})} placeholder="email"/>
            </div>

            <div className = "sapphire-user-signup-input">
              <input name='password' type='password' onChange={(e) => this.setState({password: e.target.value})} placeholder="password"/>
            </div>
            
            <div className = "sapphire-user-signup-button-div">
              <button type='submit' className="btn btn-primary" >Welcome</button>
            </div>
          </form>
        </div>

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
