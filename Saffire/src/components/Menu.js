import React from 'react';
import { bubble as Menu } from 'react-burger-menu'
import {styles } from '../styles/styles_burgerMenu';
import firebase from 'firebase';
import history from '../history';
import { updateStatus, onUserListener } from '../actions';
import {connect} from 'react-redux';

class BurgerMenu extends React.Component {
  constructor() {
    super()
    this.state = {
      showButtons: false
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
    return (
      
      <Menu styles={styles}>
        <li><a className="menu-item" id="home" href="/">HOME</a></li>
        <li><a className="menu-item" id="mypassport"  href="/mypassport">MY PASSPORT</a></li>
        <li><a className="menu-item" id="Itineraries"  href="/itineraries">ITINERARIES</a></li> 
        <li><a className="menu-item" id="MyFriends"  href="/myfriends">FRIENDS</a></li>
        <li><a className="menu-item" onClick={this.signout} href=''>LOGOUT</a></li>
        <li><p className="menu-item" onClick={() => this.setState({showButtons: !this.state.showButtons})}>UPDATE STATUS</p></li>
        
        {this.state.showButtons &&  <li><p className="menu-item-current-status">CURRENT STATUS: {this.props.currentUser.status}</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('Just landed!')}>Just landed!</p></li>}
        {this.state.showButtons &&   <li><p className="menu-item-status" onClick={() => this.handleUpdate('At the hotel')}>At the hotel</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('Leaving for my next event')}>Leaving for my next event</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('Just finished my event')}>Just finished my event</p></li>}
        {this.state.showButtons && <li><p className="menu-item-status" onClick={() => this.handleUpdate('Getting food')}>Getting food</p></li>}
        {this.state.showButtons &&  <li><p className="menu-item-status" onClick={() => this.handleUpdate('Heading home')}>Heading home</p></li>}
        
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateStatus(user, status) {
          dispatch(updateStatus(user, status))
      },
      getCurrentUser(user) {
        dispatch(onUserListener(user))
      }
  }
}

const BurgerMenuContainer = connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
export default BurgerMenuContainer;