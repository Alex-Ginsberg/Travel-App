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
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    console.log('main currentUser', this.props.currentUser.name)
    console.log('LOCAL STORAGE: ', window.localStorage)
    
  return (
    <div className="sapphire-app">
      <BurgerMenu />

        <h1 className="sapphire-app-title">SAFFIRE</h1>
      <div className = "sapphire-auth-div clearfix">
        { !this.props.currentUser.name &&  (
            <div className="sapphire-auth-div clearfix">
              <Link to='/login' className = "sapphire-app-login">LOGIN</Link>
              <Link to='/signup' className = "sapphire-app-login">SIGN UP</Link>
            </div>
          ) 
        }
      </div>

      <div className="sapphire-home-page-border">
        <WhereTo />
      </div>

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


