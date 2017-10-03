import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import WhereTo from './WhereTo'
import BurgerMenu from './Menu';
import { getCurrentUser } from '../actions';
import firebase from '../firebase'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  // if(firebase.auth().currentUser === null) {
  // } else {
  //   console.log('main email', firebase.auth().currentUser.email)
  // }
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
  }

  render() {
    console.log('main currentUser', this.props.currentUser.name)
    
  return (

    <div className="sapphire-app bg-main">

      <div className="top-bar">
      <BurgerMenu />
      </div>
      <div className = "sapphire-auth-div">
        <h1 className="app-title">Saffire</h1>

        { !this.props.currentUser.name &&  (
            <div id="login-signup">
              <Link to='/login' className = "sapphire-app-login">Login</Link>
              <Link to='/signup' className = "sapphire-app-login">Sign Up</Link>
            </div>
          ) 
          

        }



      </div>

      <div className="border">
        <div className = "appp">
        <WhereTo />
        </div>
      </div>




      {/* <div>
        <button onClick={() => (console.log('checked', firebase.auth().currentUser))}> check </button>
        </div> */}

    </div>
  )
}


}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getCurrentUser() {
          dispatch(getCurrentUser())
  }, 

}
}

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);
export default MainContainer;


