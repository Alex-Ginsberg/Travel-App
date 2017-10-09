import React from 'react';
import { bubble as Menu } from 'react-burger-menu'
import { styles } from '../styles/styles_burgerMenu';
import firebase from 'firebase';
import history from '../history';
import { updateStatus, onUserListener, removeNotification } from '../actions';
import {connect} from 'react-redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class BurgerMenu extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false,
      showNotifications: false
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  showSettings (event) {
    event.preventDefault();
    
  }

  signout() {
    firebase.auth().signOut()
    .then(history.push('/'))
    .catch(err => console.log(err))
  }

  handleUpdate(status) {
    console.log('CALLING HANDLE UPDATE: ', status)
    this.props.updateStatus(this.props.currentUser, status)
    this.setState({showButtons: false})
    this.props.getCurrentUser(this.props.currentUser)
}
  
  render () {
    const notificationsArray = []
    for (let key in this.props.currentUser.notifications) {
      notificationsArray.push(this.props.currentUser.notifications[key].body)
    }
    return (
      
      <Menu styles={styles}>
        <div>
          <li><a className="menu-item" id="home" href="/">START YOUR ADVENTURE</a></li>
          {/* <li><a className="menu-item" id="mypassport"  href="/mypassport">MY PASSPORT</a></li> */}
          <li><a className="menu-item" id="Itineraries"  href="/itineraries">MY ITINERARIES</a></li> 
          <li><a className="menu-item" id="MyFriends"  href="/myfriends">FRIENDS</a></li>
          <MuiThemeProvider>
          <li><p className="menu-item" onClick={() => this.setState({showNotifications: !this.state.showNotifications})} >NOTIFICATIONS<Badge badgeContent={notificationsArray.length} primary={true}></Badge></p></li>
          </MuiThemeProvider>
          {this.state.showNotifications && notificationsArray.map(notification => (
            <li key={notification}><a className="menu-item" href="/myfriends">{notification}</a></li>
          ))}

          {this.props.connect && <li><p className="menu-item" onClick={() => this.setState({showButtons: !this.state.showButtons})}>UPDATE STATUS</p></li>}
        </div>

        
        
        {this.state.showButtons &&  <li><p className="menu-item-current-status">CURRENT STATUS: {this.props.currentUser.status.length > 1 ? this.props.currentUser.status : 'No selected status'}</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('')}>NO STATUS</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('Just landed!')}>Just landed!</p></li>}
        {this.state.showButtons &&   <li><p className="menu-item-status" onClick={() => this.handleUpdate('At the hotel')}>At the hotel</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('Leaving for my next event')}>Leaving for my next event</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('Just finished my event')}>Just finished my event</p></li>}
        {this.state.showButtons && <li><p className="menu-item-status" onClick={() => this.handleUpdate('Getting food')}>Getting food</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('Heading home')}>Heading home</p></li>}

        <div>
          <li><a className="menu-item" onClick={this.signout} href=''>LOGOUT</a></li>
        </div>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser,
      connect: state.connect
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateStatus(user, status) {
          dispatch(updateStatus(user, status))
      },
      getCurrentUser(user) {
        dispatch(onUserListener(user))
      },
      removeNotification(user, body) {
        dispatch(removeNotification(user, body))
      }
  }
}

const BurgerMenuContainer = connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
export default BurgerMenuContainer;