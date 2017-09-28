import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import firebase from '../firebase'
import '../App.css';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
export const Main = (props) => {
  
  // Left in as reference
//   var userRef = firebase.database().ref('users');
//   userRef.push ({
//     name: "Ron",
//     number: 1,
//     age: 30
//  });
//   console.log(userRef)
  return (
    <div className="App">
      <h1>saffire</h1>

      <nav>
        <div>
          <Link to='/login'>Login</Link>
        </div>
      </nav>
    
    </div>
  )
}

