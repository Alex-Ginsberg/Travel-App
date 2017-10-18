import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import WhereTo from './WhereTo'
import BurgerMenu from './Menu';
import { getCurrentUser } from '../actions';
import NotificationCounter from './NotificationCounter'

class Main extends Component {

render() {
  
    
  return (
    <div className="sapphire-app">

      <BurgerMenu />
      {this.props.currentUser.name && <NotificationCounter />}

        <h1 className="sapphire-app-title">SAFFIRE</h1>

        <div className = "sapphire-auth-div">
            { !this.props.currentUser.name &&  (
                <div>
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


